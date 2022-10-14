import everscaleLogo from 'assets/images/networks/everscale.svg';
import ethereumLogo from 'assets/images/networks/ethereum.svg';
import bnbchainLogo from 'assets/images/networks/bnb-chain.svg';
import polygonLogo from 'assets/images/networks/polygon.svg';
import fantomOperaLogo from 'assets/images/networks/fantom-opera.svg';
import avalancheLogo from 'assets/images/networks/avalanche.svg';

export const networks = [
  {
    chainId: '0',
    currencySymbol: 'EVER',
    label: 'Everscale',
    name: 'everscale',
    rpcUrl: '',
    explorerBaseUrl: 'https://everscan.io/',
    logoUrl: everscaleLogo,
  },
  {
    chainId: '1',
    currencySymbol: 'ETH',
    label: 'Ethereum',
    name: 'ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    explorerBaseUrl: 'https://etherscan.io/',
    transactionType: 0x2,
    logoUrl: ethereumLogo,
  },
  {
    chainId: '56',
    currencySymbol: 'BNB',
    label: 'Binance Smart Chain',
    name: 'bnbchain',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    explorerBaseUrl: 'https://bscscan.com/',
    transactionType: 0x0,
    logoUrl: bnbchainLogo,
  },
  {
    chainId: '250',
    currencySymbol: 'FTM',
    label: 'Fantom Opera',
    name: 'fantom_opera',
    rpcUrl: 'https://rpc.ankr.com/fantom/',
    explorerBaseUrl: 'https://ftmscan.com/',
    transactionType: 0x0,
    logoUrl: fantomOperaLogo,
  },
  {
    chainId: '137',
    currencySymbol: 'MATIC',
    label: 'Polygon',
    name: 'polygon',
    rpcUrl: 'https://matic-mainnet.chainstacklabs.com/',
    explorerBaseUrl: 'https://polygonscan.com/',
    transactionType: 0x0,
    logoUrl: polygonLogo,
  },
  {
    chainId: '43114',
    currencySymbol: 'AVAX',
    label: 'Avalanche',
    name: 'avalanche',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorerBaseUrl: 'https://snowtrace.io/',
    logoUrl: avalancheLogo,
  },
];
