import create from 'zustand';

import { getAddChainParameters } from '../utils/chains';
import { getLocalStorage, setLocalStorage } from '../utils/localstorge';
import { metamask } from '../connectors/metamask';
import { network } from '../connectors/network';

interface IAuthStore {
  targetChainId: number;

  setTargetChainId: (chainId: number) => void;
  connectNetwork: () => Promise<boolean>;
  connectWallet: () => Promise<boolean>;
};

const useNetworkStore = create<IAuthStore>((set, get) => ({
  targetChainId: getLocalStorage('targetChainId', 137),

  setTargetChainId: (chainId) => {
    setLocalStorage('targetChainId', chainId);
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
