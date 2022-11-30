import create from 'zustand';
import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';

interface IAuthStore {
  alchemy: Alchemy | null;
  rpcProvider: ethers.providers.JsonRpcProvider | ethers.providers.AlchemyProvider | null;

  web3Available: boolean;
  web3Provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;

  init: (apiKey: string, network: 'matic') => void;
  connectWallet: () => void;
};

const useNetworkStore = create<IAuthStore>((set, get) => ({
  alchemy: null,
  rpcProvider: null,

  web3Available: true,
  web3Provider: null,
  signer: null,

  init: async (apiKey, network) => {
    apiKey = apiKey === '' ? 'demo' : apiKey;
    const alchemy = new Alchemy({ apiKey: apiKey, network: Network.MATIC_MAINNET });
    const rpcProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    const web3Available = window.ethereum ? true : false;

    set({
      alchemy: alchemy,
      rpcProvider: rpcProvider,
      web3Available: web3Available,
    });
  },

  connectWallet: async () => {
    if(!get().web3Available) return;
  }
}));

export default useNetworkStore;
