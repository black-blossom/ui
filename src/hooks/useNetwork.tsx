import create from 'zustand';
import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';

import { metamask } from './../connectors/metamask';
import { getAddChainParameters } from './../utils/chains';

interface IAuthStore {
  chainId: number;
  alchemy: Alchemy | null;
  rpcProvider: ethers.providers.JsonRpcProvider | ethers.providers.AlchemyProvider | null;

  init: () => void;
  connectWallet: () => Promise<boolean>;
};

// TODO: use the web3-react Network connector
const useNetworkStore = create<IAuthStore>((set, get) => ({
  chainId: 137,
  alchemy: null,
  rpcProvider: null,

  init: async () => {
    const alchemy = new Alchemy({ apiKey: 'demo', network: Network.MATIC_MAINNET });
    const rpcProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

    set({
      alchemy: alchemy,
      rpcProvider: rpcProvider,
    });
  },

  connectWallet: async () => {
    let success = true;
    await metamask.activate(getAddChainParameters(137))
      .catch((error) => {
        success = false;
      });

    return success;
  },
}));

export default useNetworkStore;
