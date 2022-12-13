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

// TODO: these should be according to chain selected
const pairData = [
  {
    name: 'WETH/USDC',
    token0: 'weth',
    token1: 'usdc',
  },
  {
    name: 'WBTC/USDC',
    token0: 'wbtc',
    token1: 'usdc',
  },
  {
    name: 'MATIC/USDC',
    token0: 'matic',
    token1: 'usdc',
  },
  {
    name: 'WETH/WBTC',
    token0: 'weth',
    token1: 'wbtc',
  },
  {
    name: 'MATIC/WETH',
    token0: 'matic',
    token1: 'weth',
  },
  {
    name: 'MATIC/WBTC',
    token0: 'matic',
    token1: 'wbtc',
  },
];

interface IPairSelectorProps {
  selected: string;
  onChange: (event: SelectChangeEvent) => void;
};

// TODO: we need to add a way to change the targetChainId + update network
const PairSelector = ({ selected, onChange }: IPairSelectorProps) => {

  return (
    <Select
      value={selected}
      size="small"
      onChange={onChange}
      IconComponent={ExpandMore}
      sx={{ height: 48, minWidth: 190 }}
    >
      {
        pairData.map(({ name, token0, token1 }, index) => {
          return (
            <MenuItem
              key={`$${name}$${index}`}
              value={name}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  badgeContent={<Avatar src={`/token-images/${token1}.png`} sx={{ width: 14, height: 14, bgcolor: 'white' }} />}
                >
                  <Avatar src={`/token-images/${token0}.png`} sx={{ width: 28, height: 28, bgcolor: 'white' }} />
                </Badge>
                <Typography variant="body2">{name}</Typography>
              </Stack>
            </MenuItem>
          );
        })
      }
    </Select>
  );
};

export default PairSelector;
