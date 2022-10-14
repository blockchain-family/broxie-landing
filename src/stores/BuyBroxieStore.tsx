import BigNumber from 'bignumber.js';
import { BroxieStore } from './BroxieStore';
import { marketCallbacksAbi } from 'abi/everscale/marketCallbacks';
import { marketAbi } from 'abi/everscale/market';
import { tokenWalletAbi } from 'abi/everscale/tokenWallet';
import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { EverWalletStore } from './EverWalletStore';
import { MetaMaskStore } from './MetaMaskStore';
import { Network, NetworkCurrency } from './StaticDataStore';
import {
  BridgePaymentData,
  getBridgePaymentData,
  getErc20AllowanceApproval,
  sendDepositToFactory,
} from 'utils/bridge';
import { mintAsTransferAbi } from 'abi/everscale/mintAsTransfer';
import { wrapEversToAbi } from 'abi/everscale/wrapEversTo';
import { vaultAbi } from 'abi/everscale/vault';

export enum PurchaseState {
  Start,
  Payment,
  WaitingForConfirmation,
  WaitingForTransaction,
  Cancelled,
  Completed,
  Error,
}

export type PurchaseRequest = {
  totalAmount: BigNumber;
  expectedRegularPriceNfts: number;
  expectedDiscountPriceNfts: number;
};

export type PurchaseResult = {
  success: boolean;
  nftPurchased: number;
  expectedNfts: number;
};

type BalanceInfo = {
  ownedNfts: string[];
  discounts: number;
  token: BigNumber;
};

const balanceInfoDefaultValue = {
  ownedNfts: [],
  discounts: 0,
  token: new BigNumber(0),
};

export class BuyBroxieStore {
  constructor(
    private everWallet: EverWalletStore,
    private metaMask: MetaMaskStore,
    private broxieStore: BroxieStore
  ) {
    makeAutoObservable(this);

    reaction(
      () => this.everWallet.account,
      () => {
        this.refresh();
      }
    );
  }

  get canBuyNftCount() {
    if (!this.broxieStore.isMarketOpen) {
      return 0;
    }

    return Math.min(
      this.broxieStore.availableNftCount,
      this.broxieStore.marketInfo.nftPerHand -
        this.currentBalance.ownedNfts.length
    );
  }

  get canBuyMore() {
    if (!this.broxieStore.isMarketOpen) {
      return false;
    }

    if (this.canBuyNftCount <= 0) {
      return false;
    }

    return true;
  }

  get isCorrectNetwork() {
    if (this.everWallet.networkId === this.broxieStore.networkId) {
      return true;
    }

    if (this.everWallet.networkName === this.broxieStore.networkName) {
      return true;
    }

    return false;
  }

  private _currentBalance: BalanceInfo = balanceInfoDefaultValue;
  private _purchaseState = PurchaseState.Start;
  private _purchaseRequest?: PurchaseRequest;
  private _purchaseResult?: PurchaseResult;
  private _bridgePaymentData?: BridgePaymentData;

  get currentBalance() {
    return this._currentBalance;
  }

  get purchaseState() {
    return this._purchaseState;
  }

  get purchaseRequest() {
    return this._purchaseRequest;
  }

  get purchaseResult() {
    return this._purchaseResult;
  }

  get bridgePaymentData() {
    return this._bridgePaymentData;
  }

  async refresh() {
    this.broxieStore.refresh();

    const balanceInfo = await this.getCurrentState();

    runInAction(() => {
      this._currentBalance = balanceInfo;
    });
  }

  async resetPurchaseState() {
    runInAction(() => {
      this._purchaseState = PurchaseState.Start;
      this._purchaseRequest = undefined;
      this._purchaseResult = undefined;
      this._bridgePaymentData = undefined;
    });
  }

  moveToPaymentState(purchaseRequest: PurchaseRequest) {
    runInAction(() => {
      this._purchaseState = PurchaseState.Payment;
      this._purchaseRequest = purchaseRequest;
      this._purchaseResult = undefined;
      this._bridgePaymentData = undefined;
    });
  }

  async buy(purchaseRequest: PurchaseRequest) {
    if (!this.everWallet.account || !this.broxieStore.staticProvider) {
      return;
    }

    if (!purchaseRequest) {
      return;
    }

    runInAction(() => {
      this._purchaseState = PurchaseState.WaitingForConfirmation;
    });

    const payloadId = Math.floor(Date.now() / 1000).toString();

    const toNftNumber = this.broxieStore.getCurrentToNftNumber(
      purchaseRequest.expectedRegularPriceNfts
    );

    const subscriber = new this.broxieStore.staticProvider.Subscriber();

    try {
      const stateBeforePurchase = await this.getCurrentState();

      const marketRootContract = new this.broxieStore.staticProvider.Contract(
        marketAbi,
        this.broxieStore.marketAddress
      );

      const { value0: marketPayload } = await marketRootContract.methods
        .buildPayload({
          id: payloadId,
          toNftNumber: toNftNumber,
          user: this.everWallet.account.address,
        })
        .call();

      const marketCallbacks = new this.broxieStore.staticProvider.Contract(
        marketCallbacksAbi,
        this.everWallet.account.address
      );

      const marketCallbackStream = await subscriber
        .transactions(this.everWallet.account.address)
        .flatMap((item) => item.transactions)
        .filterMap(async (transaction) => {
          const result = await marketCallbacks.decodeTransaction({
            transaction,
            methods: ['onSuccess', 'onCancel'],
          });

          if (!result || result.input.id !== payloadId) {
            return undefined;
          }

          return { isSuccessful: result.method === 'onSuccess' };
        })
        .delayed((stream) => stream.first());

      await this.processPayment(purchaseRequest, marketPayload);

      runInAction(() => {
        this._purchaseState = PurchaseState.WaitingForTransaction;
      });

      const purchaseResult = await marketCallbackStream();
      const stateAfterPurchase = await this.getCurrentState();

      const nftPurchased =
        stateAfterPurchase.ownedNfts.length -
        stateBeforePurchase.ownedNfts.length;

      const expectedNfts =
        purchaseRequest.expectedRegularPriceNfts +
        purchaseRequest.expectedDiscountPriceNfts;

      runInAction(() => {
        this._purchaseState = PurchaseState.Completed;
        this._purchaseRequest = undefined;
        this._purchaseResult = {
          success: purchaseResult.isSuccessful,
          nftPurchased: nftPurchased,
          expectedNfts: expectedNfts,
        };
      });
    } catch (err: any) {
      if (
        err.code === 3 ||
        err.code === 'ACTION_REJECTED' ||
        err.message === 'Rejected by user'
      ) {
        runInAction(() => {
          this._purchaseState = PurchaseState.Cancelled;
        });

        return;
      }

      console.error(err);

      runInAction(() => {
        this._purchaseState = PurchaseState.Error;
      });
    } finally {
      subscriber.unsubscribe();
      this.refresh();
    }
  }

  async setBridgePaymentCurrency(
    network: Network | undefined,
    currency: NetworkCurrency | undefined
  ) {
    runInAction(() => {
      this._bridgePaymentData = undefined;
    });

    if (
      !network ||
      !currency ||
      !this.purchaseRequest ||
      !this.metaMask.provider ||
      !this.metaMask.account
    ) {
      return;
    }

    const erc20paymentData = await getBridgePaymentData({
      network: network,
      currency: currency,
      tip3amount: this.purchaseRequest?.totalAmount,
      tip3token: {
        symbol: this.broxieStore.tokenInfo.symbol,
        address: this.broxieStore.tokenInfo.rootAddress.toString(),
        decimals: this.broxieStore.tokenInfo.decimals,
      },
      everBalance: this.currentBalance.token,
      userAddress: this.metaMask.account,
      metaMask: this.metaMask.provider,
      everWallet: this.everWallet.provider,
    });

    runInAction(() => {
      this._bridgePaymentData = erc20paymentData;
    });
  }

  private async getCurrentState(): Promise<BalanceInfo> {
    if (!this.everWallet.account) {
      return balanceInfoDefaultValue;
    }

    try {
      const tokenBalancePromise = this.getTokenWalletBalance();

      const marketRootContract = new this.everWallet.provider.Contract(
        marketAbi,
        this.broxieStore.marketAddress
      );

      const { value0: ownedNfts } = await marketRootContract.methods
        .nftsOf({ _user: this.everWallet.account.address })
        .call();

      const { value0: discount } = await marketRootContract.methods
        .discountOf({ user: this.everWallet.account.address })
        .call();

      const walletEverBalance = await this.everWallet.provider.getBalance(
        this.everWallet.account.address
      );

      const everBalance = new BigNumber(walletEverBalance).shiftedBy(
        -this.broxieStore.coinInfo.decimals
      );

      const tokenBalance = await tokenBalancePromise;

      return {
        ownedNfts: ownedNfts,
        discounts: Number(discount),
        token: this.broxieStore.isMarketInEver ? everBalance : tokenBalance,
      };
    } catch (err) {
      console.error('Get current state error.', err);
      return balanceInfoDefaultValue;
    }
  }

  private async getTokenWalletBalance(): Promise<BigNumber> {
    try {
      if (!this.everWallet.account) {
        return balanceInfoDefaultValue.token;
      }

      const tokenWalletContract = new this.everWallet.provider.Contract(
        tokenWalletAbi,
        this.everWallet.account.tokenWalletAddress
      );

      const { value0: balance } = await tokenWalletContract.methods
        .balance({ answerId: 0 })
        .call();

      return new BigNumber(balance).shiftedBy(
        -this.broxieStore.tokenInfo.decimals
      );
    } catch {
      return balanceInfoDefaultValue.token;
    }
  }

  private processPayment(
    purchaseRequest: PurchaseRequest,
    marketPayload: string
  ) {
    if (!this.broxieStore.isMarketInEver) {
      return this.processPaymentWithToken(purchaseRequest, marketPayload);
    }

    if (this.bridgePaymentData) {
      return this.processPaymentViaBridge(
        this.bridgePaymentData,
        marketPayload
      );
    }

    return this.processPaymentWithEver(purchaseRequest, marketPayload);
  }

  private async processPaymentWithToken(
    purchaseRequest: PurchaseRequest,
    marketPayload: string
  ) {
    if (!this.everWallet.account || !this.broxieStore.staticProvider) {
      throw Error(
        'Cannot process buyWithToken. EverWallet account or static provider is not defined.'
      );
    }

    const tokenWalletContract = new this.everWallet.provider.Contract(
      tokenWalletAbi,
      this.everWallet.account.tokenWalletAddress
    );

    const transfer = tokenWalletContract.methods.transfer({
      amount: purchaseRequest.totalAmount
        .shiftedBy(this.broxieStore.tokenInfo.decimals)
        .dp(0, BigNumber.ROUND_UP)
        .toFixed(),
      deployWalletValue: 0,
      recipient: this.broxieStore.marketAddress,
      remainingGasTo: this.everWallet.account.address,
      payload: marketPayload,
      notify: true,
    });

    await transfer.send({
      amount: new BigNumber(5)
        .shiftedBy(this.broxieStore.coinInfo.decimals)
        .dp(0, BigNumber.ROUND_UP)
        .toFixed(),
      from: this.everWallet.account.address,
      bounce: true,
    });
  }

  private async processPaymentWithEver(
    purchaseRequest: PurchaseRequest,
    marketPayload: string
  ) {
    if (!this.everWallet.account || !this.broxieStore.staticProvider) {
      throw Error(
        'Cannot process buyWithEver. EverWallet account or static provider is not defined.'
      );
    }

    const mintAsTransferContract = new this.broxieStore.staticProvider.Contract(
      mintAsTransferAbi,
      this.broxieStore.everWrapInfo.mintAsTransferAddress
    );

    const { value0: mintAsTransferPayload } =
      await mintAsTransferContract.methods
        .buildPayload({
          dest: this.broxieStore.marketAddress,
          deployWalletVaule: 0,
          transferPayload: marketPayload,
        })
        .call();

    const wrapEversToContract = new this.broxieStore.staticProvider.Contract(
      wrapEversToAbi,
      this.broxieStore.everWrapInfo.wrapEversToAddress
    );

    const { weverVault: vaultAddress } = await wrapEversToContract.methods
      .weverVault()
      .call();

    const vaultContract = new this.everWallet.provider.Contract(
      vaultAbi,
      vaultAddress
    );

    const wrapTransaction = vaultContract.methods.wrap({
      tokens: purchaseRequest.totalAmount
        .shiftedBy(this.broxieStore.tokenInfo.decimals)
        .toFixed(),
      owner_address: this.broxieStore.everWrapInfo.mintAsTransferAddress,
      gas_back_address: this.everWallet.account.address,
      payload: mintAsTransferPayload,
    });

    await wrapTransaction.send({
      amount: purchaseRequest.totalAmount
        .plus(6)
        .shiftedBy(this.broxieStore.coinInfo.decimals)
        .toFixed(),
      from: this.everWallet.account.address,
      bounce: true,
    });
  }

  private async processPaymentViaBridge(
    bridgePaymentData: BridgePaymentData,
    marketPayload: string
  ) {
    if (!this.metaMask.provider || !this.metaMask.account) {
      throw Error(
        'Cannot process buyViaBridge. MetaMask account or provider is not defined.'
      );
    }

    if (!this.everWallet.account || !this.broxieStore.staticProvider) {
      throw Error(
        'Cannot process buyViaBridge. EverWallet account or static provider is not defined.'
      );
    }

    const mintAsTransferContract = new this.broxieStore.staticProvider.Contract(
      mintAsTransferAbi,
      this.broxieStore.everWrapInfo.mintAsTransferAddress
    );

    const { value0: mintAsTransferPayload } =
      await mintAsTransferContract.methods
        .buildPayload({
          dest: this.broxieStore.marketAddress,
          deployWalletVaule: 0,
          transferPayload: marketPayload,
        })
        .call();

    const wrapEversToContract = new this.broxieStore.staticProvider.Contract(
      wrapEversToAbi,
      this.broxieStore.everWrapInfo.wrapEversToAddress
    );

    const { value0: level3Payload } = await wrapEversToContract.methods
      .buildLayer3({
        amount: bridgePaymentData.tip3amount
          .shiftedBy(bridgePaymentData.tip3token.decimals)
          .dp(0, BigNumber.ROUND_UP)
          .toFixed(),
        wrapPayload: mintAsTransferPayload,
        to: this.broxieStore.everWrapInfo.mintAsTransferAddress,
      })
      .call();

    await getErc20AllowanceApproval({
      network: bridgePaymentData.network,
      ownerAddress: bridgePaymentData.userAddress,
      spenderAddres: bridgePaymentData.vaultAddress,
      erc20amount: bridgePaymentData.erc20amount,
      erc20token: bridgePaymentData.erc20token,
      metaMask: this.metaMask.provider,
    });

    await sendDepositToFactory({
      bridgePaymentData: bridgePaymentData,
      level3Payload: level3Payload,
      userAddress: this.everWallet.account.address,
      userAddressEvm: this.metaMask.account,
      wrapEversToAddress: this.broxieStore.everWrapInfo.wrapEversToAddress,
      metaMask: this.metaMask.provider,
    });
  }
}
