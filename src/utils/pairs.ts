import { ETH, BTC, USDC, MATIC, Token } from './tokens';

export const PAIRS: { [chainId: number]: { [pairName: string]: { token0: Token, token1: Token } } } = {
  // Optimism
  10: {
    "ETH/USD"  : { token0: ETH[10], token1: USDC[10] },
    "BTC/USD"  : { token0: BTC[10], token1: USDC[10] },
    "ETH/BTC"  : { token0: ETH[10], token1: BTC [10] },
  },
  // Polygon
  137: {
    "ETH/USD"  : { token0: ETH  [137], token1: USDC[137] },
    "BTC/USD"  : { token0: BTC  [137], token1: USDC[137] },
    "ETH/BTC"  : { token0: ETH  [137], token1: BTC [137] },
    "MATIC/USD": { token0: MATIC[137], token1: USDC[137] },
    "MATIC/ETH": { token0: MATIC[137], token1: ETH [137] },
    "MATIC/BTC": { token0: MATIC[137], token1: BTC [137] },
  },
  // Arbitrum
  42161: {
    "ETH/USD"  : { token0: ETH[42161], token1: USDC[42161] },
    "BTC/USD"  : { token0: BTC[42161], token1: USDC[42161] },
    "ETH/BTC"  : { token0: ETH[42161], token1: BTC [42161] },
  },
};

export const PAIRSLIST: { [chainId: number]: string[] } = {
  // Optimism
  10: ['ETH/USD', 'BTC/USD', 'ETH/BTC'],
  // Polygon
  137: ['ETH/USD', 'BTC/USD', 'ETH/BTC', 'MATIC/USD', 'MATIC/ETH', 'MATIC/BTC'],
  // Arbitrum
  42161: ['ETH/USD', 'BTC/USD', 'ETH/BTC'],
};
