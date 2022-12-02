import { useState } from 'react';
import {
  Avatar,
  MenuItem,
  Select,
} from '@mui/material';

import { CHAINLIST } from '../utils/chains';

const NetworkSelector = () => {
  const [selected, setSelected] = useState(137);

  return (
    <Select
      value={selected}
      size="small"
      onChange={ (e) => setSelected(Number(e.target.value)) }
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
