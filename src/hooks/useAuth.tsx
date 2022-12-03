import create from 'zustand';

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
  data: {
    auth: false,
    username: ''
  },
  authenticate: () => {
    set({
      data: { 
        auth: true,
        username: 'Godyl'
      }
    });
  },

  deauhenticate: () => {
    set({data: { auth: false, username: '' }});
  },
}));

export default useAuthStore;
