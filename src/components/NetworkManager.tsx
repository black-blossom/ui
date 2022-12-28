import { useEffect } from 'react';

import useNetworkStore from '../hooks/useNetwork';
import useAuthStore from '../hooks/useAuth';
import useUserStore from '../hooks/useUserStore';
import usePriceStore from '../hooks/usePrice';
import { useChainId } from '../connectors/network';

const NetworkManager = () => {
  const networkChainId = useChainId();
  const targetChainId = useNetworkStore(state => state.targetChainId);
  const connectNetwork = useNetworkStore(state => state.connectNetwork);
  const connectWallet = useNetworkStore(state => state.connectWallet);
  const { address, token } = useAuthStore(state => state.data);
  const firebaseAuth = useAuthStore(state => state.firebaseAuth);
  const getUserData = useUserStore(state => state.getUserData);
  const subscribeToPrices = usePriceStore(state => state.subscribe);

  useEffect(() => {
    connectNetwork();
    if(token) {
      connectWallet();
      firebaseAuth();
      if(address) getUserData(address);
    }
  }, [targetChainId]);

  useEffect(() => {
    if(!networkChainId) return;

    subscribeToPrices(networkChainId);
  }, [networkChainId]);

  return <></>
}

export default NetworkManager;
