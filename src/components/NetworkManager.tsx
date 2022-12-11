import { useEffect } from 'react';

import useNetworkStore from '../hooks/useNetwork';
import useAuthStore from '../hooks/useAuth';
import useUserStore from '../hooks/useUserStore';

const NetworkManager = () => {
  const targetChainId = useNetworkStore(state => state.targetChainId);
  const connectNetwork = useNetworkStore(state => state.connectNetwork);
  const connectWallet = useNetworkStore(state => state.connectWallet);
  const { address, token } = useAuthStore(state => state.data);
  const firebaseAuth = useAuthStore(state => state.firebaseAuth);
  const getUserData = useUserStore(state => state.getUserData);

  useEffect(() => {
    connectNetwork();
    if(token) {
      connectWallet();
      firebaseAuth();
      if(address) getUserData(address);
    }
  }, [targetChainId]);

  return <></>
}

export default NetworkManager;
