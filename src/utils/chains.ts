import type { AddEthereumChainParameter } from '@web3-react/types'

import polygonLogo from './../assets/polygon-logo.png';
import arbitrumLogo from './../assets/arbitrum-logo.png';
import optimismLogo from './../assets/optimism-logo.png';

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
}

const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Matic',
  symbol: 'MATIC',
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
  chainId: number
  logo: any
  available: boolean
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    }
  } else {
    return chainId
  }
}

export const CHAINS: { [chainId: number]: BasicChainInformation | ExtendedChainInformation } = {
  // Optimism
  10: {
    urls: [
      'https://mainnet.optimism.io',
    ],
    name: 'Optimism',
    chainId: 10,
    logo: optimismLogo,
    available: true,
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  // Arbitrum
  42161: {
    urls: [
      'https://arb1.arbitrum.io/rpc',
    ],
    name: 'Arbitrum One',
    chainId: 42161,
    logo: arbitrumLogo,
    available: true,
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  // Polygon
  137: {
    urls: [
      'https://polygon-rpc.com',
    ],
    name: 'Polygon Mainnet',
    chainId: 137,
    logo: polygonLogo,
    available: true,
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://polygonscan.com'],
  },
}

export const CHAINLIST: BasicChainInformation[] | ExtendedChainInformation[] = [
  CHAINS[137],
  CHAINS[42161],
]

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
  (accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls

    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs
    }

    return accumulator
  },
  {}
)

export const DEFAULT_CHAIN = 137;
