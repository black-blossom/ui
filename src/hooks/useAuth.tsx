import create from 'zustand';
import { providers } from 'ethers';
import { SiweMessage } from 'siwe';

import { getLocalStorage, setLocalStorage } from '../utils/localstorge';

const domain = window.location.host;
const origin = window.location.origin;

const createSiweMessage = (address: string, statement: string, chainId: number) => {
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: chainId,
  });
  return message.prepareMessage();
};

interface IUserData {
  auth: boolean;
  username: string;
};

interface IAuthStore {
  data: IUserData;
  authenticate: (signer: providers.JsonRpcSigner) => Promise<boolean>;
  deauhenticate: () => void;
};

const useAuthStore = create<IAuthStore>((set) => ({
  data: getLocalStorage('auth_data', {
    auth: false,
    username: '',
    nonce: '',
  }),

  authenticate: async (signer) => {
    // get nonce from server here
    const message = createSiweMessage(
      await signer.getAddress(),
      'Login to Black Blossom',
      await signer.getChainId()
    );
    const signature = await signer.signMessage(message);

    // verify message here

    const data = {
      auth: true,
      username: 'Godyl',
      // nonce would need to be saved as well
    };

    setLocalStorage('auth_data', data);
    set({ data: data });
    return true;
  },

  // we need a way to attempt to authenticate with a saved off nonce
  // this migh just be the same authenticate fn. we just save the nonce and if there' a nonce
  // saved for the connected wallet then we attempt a login. invalidate nonce if login fails.
  // if login succeeds then we return user data

  deauhenticate: () => {
    setLocalStorage('auth_data', { auth: false, username: '' });
    set({data: { auth: false, username: '' }});
  },
}));

export default useAuthStore;
