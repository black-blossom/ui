import { useEffect } from 'react';

import useNetworkStore from '../hooks/useNetwork';
import useAuthStore from '../hooks/useAuth';

// TODO: add toast message to switch network when there's a mismatch
// TODOO: fix issue where isActive is false but wallet is actually connected to RPC
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
