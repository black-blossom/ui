export class Token {
  public readonly name    : string;
  public readonly symbol  : string;
  public readonly decimals: number;
  public readonly address : string;
  public readonly logoSrc : string;

  public readonly liquidationPenalty: number;
  public readonly liquidationThreshold: number;
  public readonly maxLeverage: number;

  public readonly isNative: boolean;

  public constructor(
    name    : string,
    symbol  : string,
    decimals: number,
    address : string,

    liquidationPenalty: number,
    liquidationThreshold: number,
    maxLeverage: number,

    isNative: boolean = false,
  ){
    this.name     = name;
    this.symbol   = symbol;
    this.decimals = decimals;
    this.address  = address;
    this.logoSrc  = `/token-images/${symbol.toLowerCase()}.png`;

    this.liquidationPenalty   = liquidationPenalty;
    this.liquidationThreshold = liquidationThreshold;
    this.maxLeverage          = maxLeverage;

    this.isNative = isNative;
  };

  public wrapped() {
    return new Token(
      `Wrapped ${this.name}`,
      `W${this.symbol}`,
      this.decimals,
      this.address,
      this.liquidationPenalty,
      this.liquidationThreshold,
      this.maxLeverage
    );
  };
};

export const ETH: { [chainId: number]: Token } = {
  10: new Token(
    'Ether', 'ETH', 18,
    '0x4200000000000000000000000000000000000006',
    0.05, 0.825, 4.5, true
  ),
  137: new Token(
    'Wrapped Ether', 'WETH', 18,
    '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    0.05, 0.825, 4.5, false
  ),
  42161: new Token(
    'Ether', 'ETH' , 18,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    0.05, 0.825, 4.5, true
  ),
};

export const BTC: { [chainId: number]: Token } = {
  10: new Token(
    'Wrapped BTC', 'WBTC', 8,
    '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
    0.10, 0.75, 3.0
  ),
  137: new Token(
    'Wrapped BTC', 'WBTC', 8,
    '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
    0.065, 0.75, 3.0
  ),
  42161: new Token(
    'Wrapped BTC', 'WBTC', 8,
    '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
    0.10, 0.75, 3.0
  ),
};

export const USDC: { [chainId: number]: Token } = {
  10: new Token(
    'USD Coin', 'USDC', 6,
    '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    0.05, 0.85, 4.5
  ),
  137: new Token(
    'USD Coin', 'USDC', 6,
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    0.04, 0.85, 4.5
  ),
  42161: new Token(
    'USD Coin', 'USDC', 6,
    '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    0.05, 0.85, 4.5
  ),
};

export const MATIC: { [chainId: number]: Token } = {
  137: new Token(
    'Matic', 'MATIC',18,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    0.10, 0.7, 2.5, true
  ),
};
