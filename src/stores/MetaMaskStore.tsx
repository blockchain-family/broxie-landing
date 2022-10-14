import { ethers } from 'ethers';
import { makeAutoObservable, runInAction } from 'mobx';
import { Network } from './StaticDataStore';

export class MetaMaskStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _extensionInstalled: boolean = false;
  private _account?: string;
  private _networkId?: number;
  private _provider?: ethers.providers.Web3Provider;

  get provider() {
    return this._provider;
  }

  get extensionInstalled(): boolean {
    return this._extensionInstalled;
  }

  get account(): string | undefined {
    return this._account;
  }

  get networkId(): number | undefined {
    return this._networkId;
  }

  async init() {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw Error('MetaMask is not installed');
      }

      this._provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any'
      );

      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        this.updateAccountState(accounts);
      });

      window.ethereum.on('chainChanged', () => {
        this.updateNetwork();
      });

      await this.updateNetwork();

      const canRequestAccounts = await this.canRequestAccounts();

      if (canRequestAccounts) {
        this.requestAccounts();
      }

      runInAction(() => {
        this._extensionInstalled = true;
      });
    } catch {
      runInAction(() => {
        this._extensionInstalled = false;
      });
    }
  }

  async login() {
    try {
      await this.requestAccounts();
    } catch {
      runInAction(() => {
        this._account = undefined;
        this._networkId = undefined;
      });
    }
  }

  async switchNetwork(network: Network) {
    if (!this.provider) {
      return;
    }

    try {
      await this.provider.send('wallet_switchEthereumChain', [
        { chainId: `0x${Number(network.chainId).toString(16)}` },
      ]);
    } catch (err: any) {
      if (err.code !== 4902) {
        return;
      }

      await this.addNetwork(network);
    }
  }

  private async addNetwork(network: Network) {
    if (!this.provider) {
      return;
    }

    await this.provider.send('wallet_addEthereumChain', [
      {
        chainId: `0x${Number(network.chainId).toString(16)}`,
        chainName: network.label,
        nativeCurrency: {
          name: network.currencySymbol,
          symbol: network.currencySymbol,
          decimals: 18,
        },
        rpcUrls: [network.rpcUrl],
        blockExplorerUrls: [network.explorerBaseUrl],
      },
    ]);
  }

  private async canRequestAccounts() {
    if (!this.provider) {
      return false;
    }

    const currentPermissions = await this.provider.send(
      'wallet_getPermissions',
      []
    );

    const ethAccountsPermission = currentPermissions.find(
      (x: any) => x.parentCapability === 'eth_accounts'
    );

    return ethAccountsPermission != null;
  }

  private async requestAccounts() {
    if (!this.provider) {
      return;
    }

    const accounts = await this.provider.send('eth_requestAccounts', []);

    this.updateAccountState(accounts);
  }

  private async updateNetwork() {
    if (!this.provider) {
      return;
    }

    const chainId = await this.provider.send('eth_chainId', []);

    runInAction(() => {
      this._networkId = chainId ? parseInt(chainId) : undefined;
    });
  }

  private async updateAccountState(accounts: string[]) {
    runInAction(() => {
      this._account = accounts.length > 0 ? accounts[0] : undefined;
    });
  }
}
