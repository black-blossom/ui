import { useEffect } from 'react';

import useNetworkStore from '../hooks/useNetwork';
import useAuthStore from '../hooks/useAuth';

const NetworkManager = () => {
  const targetChainId = useNetworkStore(state => state.targetChainId);
  const connectNetwork = useNetworkStore(state => state.connectNetwork);
  const connectWallet = useNetworkStore(state => state.connectWallet);
  const { auth } = useAuthStore(state => state.data);

  useEffect(() => {
    connectNetwork();
    if(auth) connectWallet();
  }, [auth, targetChainId]);

  return <></>
}

export default NetworkManager;
