import BigNumber from 'bignumber.js';
import { marketConfig } from 'config/market';
import {
  Address,
  FullContractState,
  ProviderRpcClient,
} from 'everscale-inpage-provider';
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import { makeAutoObservable, runInAction } from 'mobx';
import { marketAbi } from 'abi/everscale/market';
import { tokenRootAbi } from 'abi/everscale/tokenRoot';

export enum MarketState {
  Upcoming,
  Active,
  SoldOut,
  Completed,
}

type TokenInfo = {
  symbol: string;
  decimals: number;
  rootAddress: Address;
};

type CoinInfo = {
  symbol: string;
  decimals: number;
};

type MarketInfo = {
  nftTotal: number;
  nftPerHand: number;
  discountPrice: BigNumber;
  startDate: Date;
  revealDate: Date;
  priceRules: {
    count: number;
    price: BigNumber;
  }[];
  collectionAddress: Address;
  startIndex: number | null;
};

const marketInfoDefaultValue = {
  nftTotal: 0,
  nftPerHand: 0,
  discountPrice: new BigNumber(0),
  priceRules: [],
  startDate: new Date(),
  revealDate: new Date(),
  collectionAddress: new Address(''),
  startIndex: null,
};

const tokenInfoDefaultValue = {
  symbol: 'EVER',
  decimals: 9,
  rootAddress: new Address(''),
};

const marketStateDefaultValue = {
  state: MarketState.Upcoming,
  totalSoldCount: 0,
  totalSoldRegularPriceCount: 0,
};

const initDataDefaultValue = {
  tokenInfo: tokenInfoDefaultValue,
  marketInfo: marketInfoDefaultValue,
  marketState: marketStateDefaultValue,
};

export class BroxieStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _staticProvider?: ProviderRpcClient;

  get staticProvider() {
    return this._staticProvider;
  }

  private _tokenInfo: TokenInfo = tokenInfoDefaultValue;
  private _marketInfo: MarketInfo = marketInfoDefaultValue;
  private _marketState: MarketState = MarketState.Upcoming;
  private _totalNftSold: number = 0;
  private _totalNftSoldRegularPrice: number = 0;
  private _initialized = false;

  get initialized() {
    return this._initialized;
  }

  get marketAddress() {
    return new Address(marketConfig.marketAddress);
  }

  get coinInfo(): CoinInfo {
    return {
      symbol: 'EVER',
      decimals: 9,
    };
  }

  get everWrapInfo() {
    return {
      mintAsTransferAddress: new Address(marketConfig.mintAsTransferAddress),
      wrapEversToAddress: new Address(marketConfig.wrapEversToAddress),
    };
  }

  get tokenInfo() {
    return this._tokenInfo;
  }

  get marketInfo() {
    return this._marketInfo;
  }

  get marketState() {
    return this._marketState;
  }

  get totalNftSoldRegularPrice() {
    return this._totalNftSoldRegularPrice;
  }

  get totalNftSold() {
    return this._totalNftSold;
  }

  get availableNftCount() {
    return this.marketInfo.nftTotal - this.totalNftSold;
  }

  get isMarketOpen() {
    return (
      this.availableNftCount > 0 && this.marketState === MarketState.Active
    );
  }

  get isMarketInEver() {
    return this.tokenInfo.symbol === 'WEVER';
  }

  get networkId() {
    return marketConfig.networkId;
  }

  get networkName() {
    return marketConfig.networkName;
  }

  get paymentTokenSymbol() {
    if (this.isMarketInEver) {
      return this.coinInfo.symbol;
    }

    return this.tokenInfo.symbol;
  }

  async init() {
    if (this.initialized) {
      return;
    }

    try {
      this._staticProvider = new ProviderRpcClient({
        forceUseFallback: true,
        fallback: () =>
          EverscaleStandaloneClient.create({
            connection: {
              id: marketConfig.networkId,
              group: marketConfig.networkName,
              type: 'graphql',
              data: {
                endpoints: [marketConfig.networkEndpoint],
                local: false,
              },
            },
          }),
      });

      const { tokenInfo, marketInfo, marketState } = await this.getInitData();

      runInAction(() => {
        this._tokenInfo = tokenInfo;
        this._marketInfo = marketInfo;
        this._marketState = marketState.state;
        this._totalNftSold = marketState.totalSoldCount;
        this._totalNftSoldRegularPrice = marketState.totalSoldRegularPriceCount;
        this._initialized = true;
      });
    } catch {
      runInAction(() => {
        this._initialized = true;
      });
    }
  }

  async refresh() {
    const { state, totalSoldCount, totalSoldRegularPriceCount } =
      await this.getRefreshData();

    runInAction(() => {
      this._marketState = state;
      this._totalNftSold = totalSoldCount;
      this._totalNftSoldRegularPrice = totalSoldRegularPriceCount;
    });
  }

  getCurrentToNftNumber(nftsToBuyRegularPrice: number = 0) {
    const nftCountCurrentRule = Math.min(
      ...this.marketInfo.priceRules
        .filter((x) => x.count > 0)
        .filter(
          (x) =>
            x.count >= this.totalNftSoldRegularPrice + nftsToBuyRegularPrice
        )
        .map((x) => x.count),
      this.marketInfo.nftTotal
    );

    return nftCountCurrentRule;
  }

  getPrice(nftsToBuyRegularPrice: number = 0) {
    const rules = this.marketInfo.priceRules.filter(
      (x) => x.count < this.totalNftSoldRegularPrice + nftsToBuyRegularPrice
    );

    const price =
      rules.length > 0 ? rules[rules.length - 1].price : new BigNumber(0);

    return price;
  }

  private async getInitData() {
    if (!this.staticProvider) {
      return initDataDefaultValue;
    }

    const marketContractState = await this.getMarketContractState();
    const tokenInfo = await this.getTokenInfo(marketContractState);

    const [marketInfo, marketState] = await Promise.all([
      this.getMarketInfo(tokenInfo, marketContractState),
      this.getMarketState(marketContractState),
    ]);

    return {
      tokenInfo,
      marketInfo,
      marketState,
    };
  }

  private async getRefreshData() {
    if (!this.staticProvider) {
      return marketStateDefaultValue;
    }

    const marketContractState = await this.getMarketContractState();
    const marketState = await this.getMarketState(marketContractState);

    return marketState;
  }

  private _lastMarketContract?: {
    state: FullContractState | undefined;
    expiresAt: number;
  };

  private _lastMarketContractExpirationSeconds = 10;

  async getMarketContractState(): Promise<FullContractState | undefined> {
    if (!this.staticProvider) {
      return undefined;
    }

    if (
      this._lastMarketContract &&
      Date.now() < this._lastMarketContract.expiresAt
    ) {
      return this._lastMarketContract.state;
    }

    const { state } = await this.staticProvider.getFullContractState({
      address: this.marketAddress,
    });

    runInAction(() => {
      this._lastMarketContract = {
        state: state,
        expiresAt:
          Date.now() + 1000 * this._lastMarketContractExpirationSeconds,
      };
    });

    return state;
  }

  private async getTokenInfo(
    marketContractState: FullContractState | undefined
  ): Promise<TokenInfo> {
    if (!this.staticProvider) {
      return tokenInfoDefaultValue;
    }

    const marketRootContract = new this.staticProvider.Contract(
      marketAbi,
      this.marketAddress
    );

    const { tokenRoot: tokenRootAddress } = await marketRootContract.methods
      .tokenRoot()
      .call({ cachedState: marketContractState });

    const tokenRootContract = new this.staticProvider.Contract(
      tokenRootAbi,
      tokenRootAddress
    );

    const { state: tokenRootState } =
      await this.staticProvider.getFullContractState({
        address: tokenRootAddress,
      });

    const { value0: symbol } = await tokenRootContract.methods
      .symbol({ answerId: 0 })
      .call({ cachedState: tokenRootState });

    const { value0: decimals } = await tokenRootContract.methods
      .decimals({ answerId: 0 })
      .call({ cachedState: tokenRootState });

    return {
      symbol: symbol,
      decimals: Number(decimals),
      rootAddress: tokenRootAddress,
    };
  }

  private async getMarketInfo(
    tokenInfo: TokenInfo,
    marketContractState: FullContractState | undefined
  ): Promise<MarketInfo> {
    if (!this.staticProvider) {
      return marketInfoDefaultValue;
    }

    const marketRootContract = new this.staticProvider.Contract(
      marketAbi,
      this.marketAddress
    );

    const { totalCount } = await marketRootContract.methods
      .totalCount()
      .call({ cachedState: marketContractState });

    const { nftPerHand } = await marketRootContract.methods
      .nftPerHand()
      .call({ cachedState: marketContractState });

    const { discountPrice } = await marketRootContract.methods
      .discountPrice()
      .call({ cachedState: marketContractState });

    const { priceRule } = await marketRootContract.methods
      .priceRule()
      .call({ cachedState: marketContractState });

    const { startDate } = await marketRootContract.methods
      .startDate()
      .call({ cachedState: marketContractState });

    const { revealDate } = await marketRootContract.methods
      .revealDate()
      .call({ cachedState: marketContractState });

    const { collection } = await marketRootContract.methods
      .collection()
      .call({ cachedState: marketContractState });

    const { startIndex } = await marketRootContract.methods
      .startIndex()
      .call({ cachedState: marketContractState });

    return {
      nftTotal: Number(totalCount),
      nftPerHand: Number(nftPerHand),
      discountPrice: new BigNumber(discountPrice).shiftedBy(
        -tokenInfo.decimals
      ),
      startDate: new Date(Number(startDate) * 1000),
      revealDate: new Date(Number(revealDate) * 1000),
      priceRules: priceRule
        .map((x) => ({
          count: Number(x[0]),
          price: new BigNumber(x[1]).shiftedBy(-tokenInfo.decimals),
        }))
        .sort((x, y) => (x.count > y.count ? 1 : -1)),
      collectionAddress: collection,
      startIndex: startIndex ? Number(startIndex) : null,
    };
  }

  private async getMarketState(
    marketContractState: FullContractState | undefined
  ) {
    if (!this.staticProvider) {
      return marketStateDefaultValue;
    }

    try {
      const marketRootContract = new this.staticProvider.Contract(
        marketAbi,
        this.marketAddress
      );

      const { value0: marketState } = await marketRootContract.methods
        .state()
        .call({ cachedState: marketContractState });

      const { value0: totalSoldCount } = await marketRootContract.methods
        .commonSoldCount()
        .call({ cachedState: marketContractState });

      const { soldCount: totalSoldRegularPriceCount } =
        await marketRootContract.methods
          .soldCount()
          .call({ cachedState: marketContractState });

      return {
        state: Number(marketState) as MarketState,
        totalSoldCount: Number(totalSoldCount),
        totalSoldRegularPriceCount: Number(totalSoldRegularPriceCount),
      };
    } catch (err) {
      console.error(err);
      return marketStateDefaultValue;
    }
  }
}
