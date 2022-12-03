import create from 'zustand';

import { metamask } from './../connectors/metamask';
import { network } from './../connectors/network';
import { getAddChainParameters } from './../utils/chains';

interface IAuthStore {
  targetChainId: number;

  setTargetChainId: (chainId: number) => void;
  connectNetwork: () => Promise<boolean>;
  connectWallet: () => Promise<boolean>;
};

const useNetworkStore = create<IAuthStore>((set, get) => ({
  targetChainId: 137,

  setTargetChainId: (chainId) => {
    set({ targetChainId: chainId });
  },

  connectNetwork: async () => {
    let success = true;
    await network.activate(get().targetChainId)
      .catch((error) => {
        console.log(error);
        success = false;
      });

    return success;
  },

  connectWallet: async () => {
    let success = true;
    await metamask.activate(getAddChainParameters(get().targetChainId))
      .catch((error) => {
        console.log(error);
        success = false;
      });

    return success;
  },
}));

export default useNetworkStore;
