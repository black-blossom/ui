import { ETH, BTC, USDC, MATIC, Token } from './tokens';

export interface TokenPair {
  token0: Token;
  token1: Token;
};

export const PAIRS: { [chainId: number]: { [pairName: string]: TokenPair } } = {
  10: {
    "ETH/USD": { token0: ETH[10], token1: USDC[10] },
    "BTC/USD": { token0: BTC[10], token1: USDC[10] },
    "ETH/BTC": { token0: ETH[10], token1: BTC [10] },
  },
  137: {
    "ETH/USD"  : { token0: ETH  [137], token1: USDC[137] },
    "BTC/USD"  : { token0: BTC  [137], token1: USDC[137] },
    "ETH/BTC"  : { token0: ETH  [137], token1: BTC [137] },
    "MATIC/USD": { token0: MATIC[137], token1: USDC[137] },
    "MATIC/ETH": { token0: MATIC[137], token1: ETH [137] },
    "MATIC/BTC": { token0: MATIC[137], token1: BTC [137] },
  },
  42161: {
    "ETH/USD": { token0: ETH[42161], token1: USDC[42161] },
    "BTC/USD": { token0: BTC[42161], token1: USDC[42161] },
    "ETH/BTC": { token0: ETH[42161], token1: BTC [42161] },
  },
};

export const PAIRSLIST: { [chainId: number]: string[] } = {
  10: ['ETH/USD', 'BTC/USD', 'ETH/BTC'],
  137: ['ETH/USD', 'BTC/USD', 'ETH/BTC', 'MATIC/USD', 'MATIC/ETH', 'MATIC/BTC'],
  42161: ['ETH/USD', 'BTC/USD', 'ETH/BTC'],
};
