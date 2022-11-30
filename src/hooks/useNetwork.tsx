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
  connectWallet: () => Promise<boolean>;
  requestNetworkSwitch: () => void;
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
    if(!get().web3Available) return false;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      await provider.send('eth_requestAccounts', [])
    }
    catch(error) {
      return false;
    }

    set({
      web3Provider: provider,
      signer: provider.getSigner(),
    });
    return true;
  },

  requestNetworkSwitch: async () => {
    if(!get().web3Available) return;

    const web3provider = get().web3Provider;

    // TODO: we should be checking for the target network based on the rpcProvider
    try {
      await web3provider?.send('wallet_switchEthereumChain', [{ chainId: '0x89' }]);
    }
    catch(error) {
      await web3provider?.send('wallet_addEthereumChain', [{
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        rpcUrls: ['http://localhost:8545'],
        // rpcUrls: ['https://polygon-rpc.com', 'https://rpc.ankr.com/polygon'],
      }]);
    }
  },
}));

export default useNetworkStore;
