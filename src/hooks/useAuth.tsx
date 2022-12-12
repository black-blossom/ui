import axios from 'axios';
import create from 'zustand';
import { providers } from 'ethers';
import { SiweMessage } from 'siwe';
import { getAuth, signInWithCustomToken, signOut, updateProfile } from 'firebase/auth';

import firebaseApp from '../utils/firebase';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/localstorge';

const AUTHDATA = 'authData';
const DEFAULT_AUTHDATA: IUserData = {
  address: null,
  token: null,
};

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
  address: string | null;
  token: string | null;
};

interface IAuthStore {
  data: IUserData;
  authenticate: (signer: providers.JsonRpcSigner) => Promise<boolean>;
  deauthenticate: () => void;
  firebaseAuth: () => Promise<boolean>;
  setDisplayName: (name: string) => void;
};

const useAuthStore = create<IAuthStore>((set, get) => ({
  data: getLocalStorage(AUTHDATA, DEFAULT_AUTHDATA),

  authenticate: async (signer) => {
    // get nonce from server here and create message with nonce
    const message = createSiweMessage(
      await signer.getAddress(),
      'Login to Black Blossom',
      await signer.getChainId()
    );
    const signature = await signer.signMessage(message)
      .catch(error => {
        console.log('useAuthStore.authenticate: User denied message signature');
      });

    if(signature === undefined) return false;

    const res = await axios.post(
      'http://localhost:8080/verify',
      {
        message: message,
        signature: signature,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        }
      },
    );

    if(res.status !== 200) return false;

    const data = {
      address: res.data.Address,
      token: res.data.Token,
      // nonce would need to be saved as well
    };

    setLocalStorage(AUTHDATA, data);
    set({ data: data });

    return true;
  },

  // we need a way to attempt to authenticate with a saved off nonce
  // this migh just be the same authenticate fn. we just save the nonce and if there' a nonce
  // saved for the connected wallet then we attempt a login. invalidate nonce if login fails.
  // if login succeeds then we return user data

  deauthenticate: () => {
    signOut(getAuth(firebaseApp));
    removeLocalStorage(AUTHDATA);
    set({ data: DEFAULT_AUTHDATA });
  },

  firebaseAuth: async () => {
    const data = get().data;
    if(!data.token) return false;

    let success = true;
    await signInWithCustomToken(getAuth(firebaseApp), data.token)
      .catch(error => {
        success = false;
        removeLocalStorage(AUTHDATA);
        set({ data: DEFAULT_AUTHDATA });
        console.log(`failed to auth with firebase: ${error.message}`);
      });

    console.log(getAuth(firebaseApp).currentUser);

    return success;
  },

  setDisplayName: (name) => {
    const auth = getAuth(firebaseApp);
    if(!auth.currentUser) return;

    console.log('updating name');
    updateProfile(auth.currentUser, { displayName: name });
  },
}));

export default useAuthStore;
