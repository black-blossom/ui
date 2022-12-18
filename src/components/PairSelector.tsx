import {
  Avatar,
  Badge,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import { PAIRS, PAIRSLIST } from '../utils/pairs';
import { useChainId } from '../connectors/network';

interface IPairSelectorProps {
  selected: string;
  onChange: (event: SelectChangeEvent) => void;
};

const PairSelector = ({ selected, onChange }: IPairSelectorProps) => {
  const chainId = useChainId();

  return (
    <Select
      value={selected}
      size="small"
      onChange={onChange}
      IconComponent={ExpandMore}
      sx={{ height: 48, minWidth: 190 }}
    >
      { chainId !== undefined &&
        PAIRSLIST[chainId].map((pairName, index) => {
          const pair = PAIRS[chainId][pairName];

          return (
            <MenuItem
              key={`$${pairName}$${index}`}
              value={pairName}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  badgeContent={<Avatar src={pair.token1.logoSrc} sx={{ width: 14, height: 14, bgcolor: 'white' }} />}
                >
                  <Avatar src={pair.token0.logoSrc} sx={{ width: 28, height: 28, bgcolor: 'white' }} />
                </Badge>
                <Typography variant="body2">{`${pair.token0.symbol}/${pair.token1.symbol}`}</Typography>
              </Stack>
            </MenuItem>
          );
        })
      }
    </Select>
  );
};

export default PairSelector;
