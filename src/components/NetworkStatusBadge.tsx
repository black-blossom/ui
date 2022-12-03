import { Badge } from '@mui/material';

import { useChainId, useIsActive, useIsActivating } from '../connectors/metamask';
import useNetworkStore from '../hooks/useNetwork';

const NetworkStatusBadge = ({ children }: any) => {
  const targetChainId = useNetworkStore(state => state.targetChainId);
  const walletChainId = useChainId();
  const isActive = useIsActive();
  const isActivating = useIsActivating();

  const getColor = (target: number, current: number | undefined, isActive: boolean, loading: boolean) => {
    const inSync = current && target === current;

    if(loading || !inSync) return 'warning';
    if(isActive && inSync) return 'success';
    return 'error';
  }

  return (
    <Badge
      variant="dot"
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      color={ getColor(targetChainId, walletChainId, isActive, isActivating) }
    >
      {children}
    </Badge>
  );
};

export default NetworkStatusBadge;
