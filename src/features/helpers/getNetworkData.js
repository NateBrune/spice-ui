import { connectors } from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import {
  nativeCoins,
  polygonPools,
  polygonStakePools,
  polygonAddressBook,
  polygonZaps,
} from '../configure';

const networkTxUrls = {
  137: hash => `https://polygonscan.com/tx/${hash}`,
};

const networkFriendlyName = {
  137: 'Polygon',
};

const networkBuyLinks = {
  137: 'https://app.1inch.io/#/r/0xF4cb25a1FF50E319c267b3E51CBeC2699FB2A43B',
};

export const getNetworkCoin = () => {
  return nativeCoins.find(coin => coin.chainId == process.env.REACT_APP_NETWORK_ID);
};

export const getNetworkPools = () => {
  switch (process.env.REACT_APP_NETWORK_ID) {
    case '137':
      return polygonPools;
    default:
      return [];
  }
};

export const getNetworkTokens = () => {
  switch (process.env.REACT_APP_NETWORK_ID) {
    case '137':
      return polygonAddressBook.tokens;
    default:
      throw new Error(`Create address book for this chainId first.`);
  }
};

export const getNetworkBurnTokens = () => {
  switch (process.env.REACT_APP_NETWORK_ID) {
    case '137':
      return {};
    default:
      throw new Error(`Create address book for this chainId first. `);
  }
};

export const getNetworkZaps = () => {
  switch (process.env.REACT_APP_NETWORK_ID) {
    case '137':
      return polygonZaps;
    default:
      return [];
  }
};

export const getNetworkStakePools = () => {
  switch (process.env.REACT_APP_NETWORK_ID) {
    case '137':
      return polygonStakePools;
    default:
      return [];
  }
};

export const getNetworkStables = () => {
  switch (process.env.REACT_APP_NETWORK_ID) {
    case '137':
      return ['USDC', 'USDT', 'maUSDC', 'DAI'];
    default:
      return [];
  }
};

export const getNetworkMulticall = () => {
  switch (process.env.REACT_APP_NETWORK_ID) {
    case '137':
      return '0xC3821F0b56FA4F4794d5d760f94B812DE261361B';
    default:
      return '';
  }
};

export const getNetworkConnectors = t => {
  switch (process.env.REACT_APP_NETWORK_ID) {
    case '137':
      return {
        network: 'polygon',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'Injected',
              description: t('Home-BrowserWallet'),
            },
          },
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://rpc-mainnet.maticvigil.com/',
                137: 'https://rpc-mainnet.maticvigil.com/',
              },
            },
          },
        },
      };
    default:
      return {};
  }
};

export const getNetworkTxUrl = networkTxUrls[process.env.REACT_APP_NETWORK_ID];
export const getNetworkFriendlyName = () => networkFriendlyName[process.env.REACT_APP_NETWORK_ID];
export const getNetworkBuyLink = () => networkBuyLinks[process.env.REACT_APP_NETWORK_ID];
