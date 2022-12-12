import {
  Avatar,
  Badge,
  Button,
  Box,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

const LONG  = 'LONG';
const SHORT = 'SHORT';

interface IPosition {
  vault            : string;
  pair             : string;
  side             : 'LONG' | 'SHORT';
  openTimestamp    : number;
  closeTimestamp   : number;
  fundingToken     : string;
  collateralToken  : string;
  debtToken        : string;
  initialFunding   : number;
  initialCollateral: number;
  initialDebt      : number;
  finalFunding     : number;
  finalCollateral  : number;
  finalDebt        : number;
  feeOpenPosition  : number;
  feeOpenSwap      : number;
  feeOpenZap       : number;
  feeClosePosition : number;
  feeCloseSwap     : number;
  feeCloseZap      : number;
};

interface IPositionCardProps {
  position: IPosition;
}

const PositionCard = ({ position }: IPositionCardProps) => {

  return (
    <ImageCard image='/card-images/blossoming-tree.gif'>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          badgeContent={
            <Avatar src="/token-images/usdc.png" style={{ width: 20, height: 20 }} />
          }
        >
          <Avatar src="/token-images/weth.png" />
        </Badge>
        <Stack direction="column">
          <Typography variant="body2">{position.side} {position.pair}</Typography>
          <Typography variant="caption">{position.vault}</Typography>
        </Stack>
      </Stack>

      <Box sx={{ m: 3 }} />

      <Stack direction="column" spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Typography variant="body2">Position Size</Typography>
          <Typography variant="body2">${position.initialCollateral}</Typography>
        </Stack>
      </Stack>

      <Box sx={{ m: 3 }} />

      <Button variant="outlined" fullWidth>Close Position</Button>
    </ImageCard>
  );
};

interface IImageCardProps {
  children: React.ReactNode;
  image: string;
};

const ImageCard = ({ children, image }: IImageCardProps) => {

  return (
    <Paper elevation={0} sx={{ width: 1, backgroundImage: `url(${image})` }}>
      <Box sx={{ p: 1, width: 1, height: '100%', backgroundColor: '#000000aa' }}>
        {children}
      </Box>
    </Paper>
  );
};

PositionCard.defaultProps = {
  position: {
    vault            : '7c0c...7d4a',
    pair             : 'ETH/USD',
    side             : 'LONG',
    openTimestamp    : Date.now(),
    closeTimestamp   : null,
    fundingToken     : 'USDC',
    collateralToken  : 'ETH',
    debtToken        : 'USDC',
    initialFunding   : 1000,
    initialCollateral: 2000,
    initialDebt      : 1000,
    finalFunding     : null,
    finalCollateral  : null,
    finalDebt        : null,
    feeOpenPosition  : 0,
    feeOpenSwap      : 0,
    feeOpenZap       : 0,
    feeClosePosition : null,
    feeCloseSwap     : null,
    feeCloseZap      : null,
  }
}

export default PositionCard;
