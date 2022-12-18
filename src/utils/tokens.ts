export class Token {
  public readonly name    : string;
  public readonly symbol  : string;
  public readonly decimals: number;
  public readonly address : string;
  public readonly isNative: boolean;
  public readonly logoSrc : string;

  public constructor(
    name    : string,
    symbol  : string,
    decimals: number,
    address : string,
    isNative: boolean = false
  ){
    this.name     = name;
    this.symbol   = symbol;
    this.decimals = decimals;
    this.address  = address;
    this.isNative = isNative;
    this.logoSrc  = `/token-images/${symbol.toLowerCase()}.png`;
  };

  public wrapped() {
    return new Token(`Wrapped ${this.name}`, `W${this.symbol}`, this.decimals, this.address);
  };
};

export const ETH: { [chainId: number]: Token } = {
  10   : new Token('Ether'        , 'ETH' , 18, '0x4200000000000000000000000000000000000006', true),
  137  : new Token('Wrapped Ether', 'WETH', 18, '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', false),
  42161: new Token('Ether'        , 'ETH' , 18, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', true),
};

export const BTC: { [chainId: number]: Token } = {
  10   : new Token('Wrapped BTC', 'WBTC', 8, '0x68f180fcCe6836688e9084f035309E29Bf0A2095'),
  137  : new Token('Wrapped BTC', 'WBTC', 8, '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6'),
  42161: new Token('Wrapped BTC', 'WBTC', 8, '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f'),
};

export const USDC: { [chainId: number]: Token } = {
  10   : new Token('USD Coin', 'USDC', 6, '0x7F5c764cBc14f9669B88837ca1490cCa17c31607'),
  137  : new Token('USD Coin', 'USDC', 6, '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'),
  42161: new Token('USD Coin', 'USDC', 6, '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'),
};

export const MATIC: { [chainId: number]: Token } = {
  137  : new Token('Matic', 'MATIC', 18, '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', true),
};
