import {
  Avatar,
  Badge,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import { CHAINLIST } from '../utils/chains';
import useNetworkStore from '../hooks/useNetwork';
import { useIsActive, useIsActivating } from '../connectors/network';

// TODO: we need to add a way to change the targetChainId + update network
const NetworkSelector = () => {
  const targetChainId = useNetworkStore(state => state.targetChainId);
  const setTargetChainId = useNetworkStore(state => state.setTargetChainId);
  const isActive = useIsActive();
  const isActivating = useIsActivating();

  const getColor = (isActive: boolean, loading: boolean) => {
    if(loading) return 'warning';
    if(isActive) return 'success';
    return 'error';
  }

  const handleNetworkChanged = (event: SelectChangeEvent<number>) => {
    const value = event.target.value;
    const newInterval = typeof(value) == 'number' ? value : parseInt(value);
    setTargetChainId(newInterval);
  };

  return (
    <Select
      value={targetChainId}
      size="small"
      onChange={handleNetworkChanged}
      IconComponent={ExpandMore}
      sx={{ minWidth: 72 }}
    >
      {
        CHAINLIST.map(({ chainId, logo, available }) => {
          return (
            <MenuItem
              key={chainId}
              value={chainId}
              disabled={!available}
              sx={{ justifyContent: 'center' }}
            >
              {targetChainId === chainId ? (
                <Badge
                  variant="dot"
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  color={ getColor(isActive, isActivating) }
                >
                  <Avatar src={logo} sx={{ width: 20, height: 20 }} />
                </Badge>
              ) : (
                <Avatar src={logo} sx={{ width: 20, height: 20 }} />
              )}
            </MenuItem>
          );
        })
      }
    </Select>
  );
};

export default NetworkSelector;
