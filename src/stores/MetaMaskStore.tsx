import { makeAutoObservable, runInAction } from 'mobx';

export class MetaMaskStore {
  constructor() {
    makeAutoObservable(this);

    this.ethereum = window.ethereum;
  }

  private ethereum: any;

  initialized: boolean = false;
  extensionInstalled: boolean = false;
  account?: string;

  get extensionDownloadUrl() {
    return 'https://metamask.io/';
  }

  async init() {
    try {
      if (typeof this.ethereum === 'undefined') {
        throw Error('MetaMask is not installed');
      }

      this.ethereum.on('accountsChanged', (accounts: string[]) =>
        this.updateAccountState(accounts)
      );

      const canRequestAccounts = await this.canRequestAccounts();

      if (canRequestAccounts === true) {
        this.requestAccounts();
      }

      runInAction(() => {
        this.extensionInstalled = true;
        this.initialized = true;
      });
    } catch {
      runInAction(() => {
        this.extensionInstalled = false;
        this.initialized = true;
      });
    }
  }

  async login() {
    try {
      await this.requestAccounts();
    } catch {
      runInAction(() => {
        this.account = undefined;
      });
    }
  }

  private async canRequestAccounts() {
    const currentPermissions = await this.ethereum.request({
      method: 'wallet_getPermissions',
    });

    const ethAccountsPermission = currentPermissions.find(
      (x: any) => x.parentCapability === 'eth_accounts'
    );

    return ethAccountsPermission != null;
  }

  private async requestAccounts() {
    const accounts = await this.ethereum.request({
      method: 'eth_requestAccounts',
    });

    this.updateAccountState(accounts);
  }

  private async updateAccountState(accounts: string[]) {
    runInAction(() => {
      this.account = accounts.length > 0 ? accounts[0] : undefined;
    });
  }
}
