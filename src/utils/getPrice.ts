import { ethers } from 'ethers';
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { Pool } from '@uniswap/v3-sdk';
import { Token as UniswapToken } from '@uniswap/sdk-core';

import { network } from '../connectors/network';
import { PAIRS, TokenPair } from '../utils/pairs';

const address : { [pairName: string]: string } = {
  'ETH/USD': '0x45dDa9cb7c25131DF268515131f647d726f50608',
  'BTC/USD': '0x847b64f9d3A95e977D157866447a5C0A5dFa0Ee5',
  'ETH/BTC': '0x50eaEDB835021E4A108B7290636d62E9765cc6d7',
  'MATIC/USD': '0xA374094527e1673A86dE625aa59517c5dE346d32',
  'MATIC/ETH': '0x86f1d8390222A3691C28938eC7404A1661E618e0',
  'MATIC/BTC': '0x642F28a89fa9d0Fa30e664F71804Bfdd7341D21f',
};

// TODO: get contract address for pair based on chainId
const getPrice = async (pair: string, chainId: number | undefined): Promise<number> => {
  if(chainId === undefined || network.customProvider === undefined) return 0;

  const tokenPair = PAIRS[chainId ? chainId : 137][pair];
  const contract = new ethers.Contract(address[pair], IUniswapV3PoolABI, network.customProvider);

  let [sqrtPriceX96, tick] = await contract.slot0();
  const token0 = await contract.token0();
  const fee = await contract.fee();
  const liquidity = await contract.liquidity();
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
