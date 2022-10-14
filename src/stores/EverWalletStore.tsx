import { makeAutoObservable, runInAction } from 'mobx';
import {
  Address,
  hasEverscaleProvider,
  ProviderRpcClient,
} from 'everscale-inpage-provider';
import { tokenRootAbi } from 'abi/everscale/tokenRoot';
import { BroxieStore } from './BroxieStore';

type EverAccount = {
  address: Address;
  tokenWalletAddress: Address;
  publicKey: string;
  walletType: string;
};

export class EverWalletStore {
  constructor(private broxieStore: BroxieStore) {
    makeAutoObservable(this);

    this._provider = new ProviderRpcClient();
  }

  extensionInstalled: boolean = false;
  account?: EverAccount;
  networkId?: number;
  networkName?: string;

  private _provider: ProviderRpcClient;

  get provider() {
    return this._provider;
  }

  async init() {
    try {
      (await this.provider.subscribe('networkChanged')).on('data', () => {
        this.updateState();
      });

      (await this.provider.subscribe('permissionsChanged')).on('data', () => {
        this.updateState();
      });

      await this.provider.ensureInitialized();
      await this.updateState();

      const extensionInstalled = await hasEverscaleProvider();

      runInAction(() => {
        this.extensionInstalled = extensionInstalled;
      });
    } catch {
      runInAction(() => {
        this.extensionInstalled = false;
      });
    }
  }

  async login() {
    try {
      await this.provider.requestPermissions({
        permissions: ['basic', 'accountInteraction'],
      });
    } catch {
      await this.logout();
    }
  }

  async logout() {
    await this.provider.disconnect();
  }

  private async updateState() {
    const state = await this.provider.getProviderState();
    const accountInteraction = state.permissions.accountInteraction;

    let account: EverAccount | undefined = undefined;

    if (accountInteraction) {
      let tokenWalletAddress = new Address('');
      try {
        const tokenRootContract = new this.provider.Contract(
          tokenRootAbi,
          this.broxieStore.tokenInfo.rootAddress
        );

        const { value0: tokenWallet } = await tokenRootContract.methods
          .walletOf({
            answerId: 0,
            walletOwner: accountInteraction.address,
          })
          .call();

        tokenWalletAddress = tokenWallet;
      } catch {}

      account = {
        address: accountInteraction.address,
        publicKey: accountInteraction.publicKey,
        walletType: accountInteraction.contractType,
        tokenWalletAddress: tokenWalletAddress,
      };
    }

    runInAction(() => {
      this.networkId = state.networkId;
      this.networkName = state.selectedConnection;
      this.account = account;
    });
  }
}
