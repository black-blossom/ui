import { Badge } from '@mui/material';

import { useChainId, useIsActive } from '../connectors/metamask';
import useNetworkStore from '../hooks/useNetwork';

const NetworkStatusBadge = ({ children }: any) => {
  const appChainId = useNetworkStore(state => state.chainId);
  const walletChainId = useChainId();
  const isActive = useIsActive();

  return (
    <Badge
      variant="dot"
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      color={appChainId === walletChainId && isActive ? 'success' : 'error'}
    >
      {children}
    </Badge>
  );
};

export default NetworkStatusBadge;
