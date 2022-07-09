import { addressBook } from 'blockchain-addressbook';

const { polygon: polygonAddressBook } = addressBook;
export { polygonAddressBook };

export {
  vaultABI,
  bnbVaultABI,
  erc20ABI,
  strategyABI,
  multicallABI,
  govPoolABI,
  beefyUniV2ZapABI,
  uniswapV2PairABI,
  uniswapV2RouterABI,
} from './abi';
export { polygonZaps } from './zap/polygon_zaps';
export { nativeCoins } from './native_coins';
export { polygonPools } from './vault/polygon_pools';
export { polygonStakePools } from './stake/polygon_stake';
