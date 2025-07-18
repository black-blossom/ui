import create from 'zustand';

import { getAddChainParameters, DEFAULT_CHAIN } from '../utils/chains';
import { getLocalStorage, setLocalStorage } from '../utils/localstorge';
import { metamask } from '../connectors/metamask';
import { network } from '../connectors/network';
import { NoMetaMaskError } from '@web3-react/metamask';

interface IAuthStore {
  targetChainId: number;
  noMetamaskError: boolean;

  setTargetChainId: (chainId: number) => void;
  connectNetwork: () => Promise<boolean>;
  connectWallet: () => Promise<boolean>;
};

const useNetworkStore = create<IAuthStore>((set, get) => ({
  targetChainId: getLocalStorage('targetChainId', DEFAULT_CHAIN),
  noMetamaskError: false,

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
        if(error instanceof NoMetaMaskError) set({ noMetamaskError: true });
        console.log(error);
        success = false;
      });

    return success;
  },
}));

export default useNetworkStore;
