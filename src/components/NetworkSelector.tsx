import { useMemo, useState } from 'react';
import {
  Avatar,
  MenuItem,
  Select,
} from '@mui/material';

import polygonLogo from './../assets/polygon-logo.png';
import arbitrumLogo from './../assets/arbitrum-logo.png';
import optimismLogo from './../assets/optimism-logo.png';

const NetworkSelector = () => {
  const [selected, setSelected] = useState('Polygon');

  const supportedNetworks = useMemo(() => {
    return [
      {
        name: 'Polygon',
        logo: polygonLogo,
        available: true,
      },
      {
        name: 'Arbitrum',
        logo: arbitrumLogo,
        available: false,
      },
      {
        name: 'Optimism',
        logo: optimismLogo,
        available: false,
      },
    ];
  }, []);

  return (
    <Select
      value={selected}
      size="small"
      onChange={ (e) => setSelected(e.target.value) }
    >
      {
        supportedNetworks.map(({name, logo, available}, index) => {
          return (
            <MenuItem key={index} value={name} disabled={!available} sx={{ justifyContent: 'center' }}>
              <Avatar src={logo} sx={{ width: 20, height: 20 }} />
            </MenuItem>
          );
        })
      }
    </Select>
  );
};

export default NetworkSelector;
