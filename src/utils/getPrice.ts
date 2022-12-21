import { ethers } from 'ethers';
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { Pool } from '@uniswap/v3-sdk';
import { Token as UniswapToken } from '@uniswap/sdk-core';

import { network } from '../connectors/network';
import { PAIRS, TokenPair } from '../utils/pairs';

const address : { [chainId: string]: { [pairName: string]: string  } } = {
  10: {
    'ETH/USD': '0x85149247691df622eaF1a8Bd0CaFd40BC45154a9',
    'BTC/USD': '0x6168EC836D0b1f0c37381eC7eD1891a412872121',
    'ETH/BTC': '0x73B14a78a0D396C521f954532d43fd5fFe385216',
  },
  137: {
    'ETH/USD': '0x45dDa9cb7c25131DF268515131f647d726f50608',
    'BTC/USD': '0x847b64f9d3A95e977D157866447a5C0A5dFa0Ee5',
    'ETH/BTC': '0x50eaEDB835021E4A108B7290636d62E9765cc6d7',
    'MATIC/USD': '0xA374094527e1673A86dE625aa59517c5dE346d32',
    'MATIC/ETH': '0x86f1d8390222A3691C28938eC7404A1661E618e0',
    'MATIC/BTC': '0x642F28a89fa9d0Fa30e664F71804Bfdd7341D21f',
  },
  42161: {
    'ETH/USD': '0xC31E54c7a869B9FcBEcc14363CF510d1c41fa443',
    'BTC/USD': '0xA62aD78825E3a55A77823F00Fe0050F567c1e4EE',
    'ETH/BTC': '0x2f5e87C9312fa29aed5c179E456625D79015299c',
  },
};

const getPrice = async (pair: string, chainId: number | undefined): Promise<number> => {
  if(chainId === undefined || network.customProvider === undefined) return 0;

  const tokenPair = PAIRS[chainId ? chainId : 137][pair];
  const contract = new ethers.Contract(address[chainId][pair], IUniswapV3PoolABI, network.customProvider);

  const result = await Promise.all([
    contract.slot0(),
    contract.token0(),
    contract.fee(),
    contract.liquidity(),
  ]);

  const [sqrtPriceX96, tick] = result[0];
  const token0 = result[1];
  const fee = result[2];
  const liquidity = result[3];
  const match = tokenPair.token0.address === token0;

  let tokenA;
  let tokenB;
  if(match) {
    tokenA = new UniswapToken(chainId, tokenPair.token0.address, tokenPair.token0.decimals, tokenPair.token0.symbol);
    tokenB = new UniswapToken(chainId, tokenPair.token1.address, tokenPair.token1.decimals, tokenPair.token1.symbol);
  } else {
    tokenA = new UniswapToken(chainId, tokenPair.token1.address, tokenPair.token1.decimals, tokenPair.token1.symbol);
    tokenB = new UniswapToken(chainId, tokenPair.token0.address, tokenPair.token0.decimals, tokenPair.token0.symbol);
  }

  const pool = new Pool(
    tokenA,
    tokenB,
    fee,
    sqrtPriceX96.toString(),
    liquidity.toString(),
    tick,
  );

  return match ? Number(pool.token0Price.toFixed(5)) : Number(pool.token1Price.toFixed(5));
};

export default getPrice;
