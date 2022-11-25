import create from 'zustand';

interface IUserData {
  auth: boolean;
  address: string;
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
    address: '',
    username: ''
  },
  authenticate: () => {
    set({data: { auth: true, address: '0x10628634d540a3b9daa77176b1d68ac875c3213c', username: 'Godyl' }});
  },
  deauhenticate: () => {
    set({data: { auth: false, address: '', username: '' }});
  },
}));

export default useAuthStore;
