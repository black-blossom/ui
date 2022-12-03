import create from 'zustand';

import { getLocalStorage, setLocalStorage } from '../utils/localstorge';

interface IUserData {
  auth: boolean;
  username: string;
};

interface IAuthStore {
  data: IUserData;
  authenticate: () => void;
  deauhenticate: () => void;
};

const useAuthStore = create<IAuthStore>((set) => ({
  data: getLocalStorage('auth_data', {
    auth: false,
    username: '',
  }),

  authenticate: () => {
    setLocalStorage('auth_data', { auth: true, username: 'Godyl' });
    set({
      data: { 
        auth: true,
        username: 'Godyl'
      }
    });
  },

  deauhenticate: () => {
    setLocalStorage('auth_data', { auth: false, username: '' });
    set({data: { auth: false, username: '' }});
  },
}));

export default useAuthStore;
