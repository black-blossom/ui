import { Badge } from '@mui/material';

import { useChainId } from '../connectors/metamask';
import useNetworkStore from '../hooks/useNetwork';

const NetworkStatusBadge = ({ children }: any) => {
  const appChainId = useNetworkStore(state => state.chainId);
  const walletChainId = useChainId();

  return (
    <Badge
      variant="dot"
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      color={appChainId === walletChainId ? 'success' : 'error'}
    >
      {children}
    </Badge>
  );
};

export default NetworkStatusBadge;
