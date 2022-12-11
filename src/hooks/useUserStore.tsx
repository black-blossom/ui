import create from 'zustand';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import firebaseApp from '../utils/firebase';

interface IUserStore {
  username: string;
  balance: number;
  getUserData: (address: string) => void;
};

const useUserStore = create<IUserStore>((set) => ({
  username: '',
  balance: 0,

  getUserData: async (address) => {
    const docRef = doc(getFirestore(firebaseApp), 'users', address);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      set({
        username: docSnap.data().username,
        balance: docSnap.data().balance,
      });
    }

    // we need to add a way to update these this in realtime w onSnapshot
  },
}));

export default useUserStore;
