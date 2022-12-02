import {
  Avatar,
  MenuItem,
  Select,
} from '@mui/material';

import { CHAINLIST } from '../utils/chains';
import useNetworkStore from './../hooks/useNetwork';

// TODO: we need to add a way to change the targetChainId + update network
const NetworkSelector = () => {
  const chainId = useNetworkStore(state => state.chainId);

  return (
    <Select
      value={chainId}
      size="small"
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
              <Avatar src={logo} sx={{ width: 20, height: 20 }} />
            </MenuItem>
          );
        })
      }
    </Select>
  );
};

export default NetworkSelector;
