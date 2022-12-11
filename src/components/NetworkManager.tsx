import { useEffect } from 'react';

import useNetworkStore from '../hooks/useNetwork';
import useAuthStore from '../hooks/useAuth';

const NetworkManager = () => {
  const targetChainId = useNetworkStore(state => state.targetChainId);
  const connectNetwork = useNetworkStore(state => state.connectNetwork);
  const connectWallet = useNetworkStore(state => state.connectWallet);
  const { token } = useAuthStore(state => state.data);
  const firebaseAuth = useAuthStore(state => state.firebaseAuth);

  useEffect(() => {
    connectNetwork();
    if(token) {
      connectWallet();
      firebaseAuth();
    }
  }, [targetChainId]);

  return <></>
}

export default NetworkManager;
