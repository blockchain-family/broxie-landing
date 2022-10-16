import { bridgeAssets, tokenAssets } from 'config/assets';
import { networks } from 'config/networks';

export type Network = {
  chainId: string;
  currencySymbol: string;
  label: string;
  name: string;
  rpcUrl: string;
  explorerBaseUrl: string;
  transactionType?: number | undefined;
  logoUrl?: string;
};

export type NetworkCurrency = {
  tip3Token: {
    name: string;
    symbol: string;
    address: string;
    decimals: number;
    logoURI: string;
  };

  vault: {
    vault: string;
    ethereumConfiguration: string;
    depositType: string;
    token: string;
  };

  proxy: string;
};

export class StaticDataStore {
  get urls() {
    return {
      everWallet: 'https://everwallet.net',
      metaMask: 'https://metamask.io/download',
      everscale: 'https://everscale.network',
      broxus: 'https://broxus.com',
      flatQube: 'https://flatqube.io',
      octusBridge: 'https://octusbridge.io',
      everscan: 'https://everscan.io',
      broxie: {
        twitter: 'https://twitter.com/BroxieNFT',
        discord: 'https://discord.gg/6dryaZQNmC',
        telegram: 'https://t.me/broxieNFT_chat',
        instagram: 'https://instagram.com/broxieNFT',
      },
      ipfs: 'https://ipfs.broxus.com/ipfs',
    };
  }

  get networks(): Network[] {
    return networks;
  }

  getNetworkCurrencies(network: Network): NetworkCurrency[] {
    const chainCurrencies = Object.entries(bridgeAssets.token)
      .map((x) => ({
        tip3Token: tokenAssets.tokens.find((t) => t.address === x[0])!,
        proxy: x[1].proxy,
        vault: x[1].vaults.find(
          (v) => v.chainId === network.chainId && v.depositType === 'credit'
        )!,
      }))
      .filter((x) => x.tip3Token && x.vault);

    return chainCurrencies;
  }
}
