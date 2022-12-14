import {
  Avatar,
  Badge,
  Button,
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

const LONG  = 'LONG';
const SHORT = 'SHORT';

interface IPosition {
  vault            : string;
  pair             : 'WETH/USDC' | 'WETH/WBTC' | 'WBTC/USDC';
  side             : 'LONG' | 'SHORT';
  openTimestamp    : number;
  closeTimestamp   : number;
  fToken           : string;
  cToken           : string;
  dToken           : string;
  entryPrice       : number;
  iFundingUsd      : number;
  iCollateralUsd   : number;
  iDebtUsd         : number;
  iFundingAmt      : number;
  iCollateralAmt  : number;
  iDebtAmt         : number;
  fFundingUsd      : number;
  fCollateralUsd   : number;
  fDebtUsd         : number;
  fFundingAmt      : number;
  fCollateralAmt   : number;
  fDebtAmt         : number;
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
  const collateralTokenPrice = 1255;
  const debtTokenPrice = 1;

  const priceDtC = collateralTokenPrice / debtTokenPrice;

  const currentCollateralUsd = position.iCollateralAmt * priceDtC;
  const initialNetUsd = position.iCollateralUsd - position.iDebtUsd;
  const currentNetUsd = position.iCollateralAmt * collateralTokenPrice - position.iDebtAmt * debtTokenPrice;
  const pnl = currentNetUsd - position.iFundingUsd;
  const leverage = position.iCollateralUsd / initialNetUsd;

  const LT = 0.825;

  return (
    <ImageCard image='/card-images/regular-tree.gif'>
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

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Stack direction="column" alignItems="center"  spacing={1}>
            <Typography variant="caption">Position Size</Typography>
            <Typography variant="body2">${currentCollateralUsd}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack direction="column" alignItems="center"  spacing={1}>
            <Typography variant="caption">Current Price</Typography>
            <Typography variant="body2">${priceDtC}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack direction="column" alignItems="center"  spacing={1}>
            <Typography variant="caption">Entry Price</Typography>
            <Typography variant="body2">${position.entryPrice}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack direction="column" alignItems="center"  spacing={1}>
            <Typography variant="caption">Liquidation Price</Typography>
            <Typography variant="body2">${(position.iDebtAmt / (position.iCollateralAmt * LT)).toFixed(0)}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack direction="column" alignItems="center"  spacing={1}>
            <Typography variant="caption">PnL</Typography>
            <Typography variant="body2" color="lightgreen">{pnl / position.iFundingUsd * 100}%</Typography>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack direction="column" alignItems="center"  spacing={1}>
            <Typography variant="caption">Leverage</Typography>
            <Typography variant="body2">{leverage}x</Typography>
          </Stack>
        </Grid>
      </Grid>

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
    <Paper
      elevation={0}
      sx={{
        width: 1,
        borderRadius: 1,
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover'
      }}
    >
      <Box sx={{ p: 2, width: 1, borderRadius: 1, height: '100%', backgroundColor: '#000000bb' }}>
        {children}
      </Box>
    </Paper>
  );
};

PositionCard.defaultProps = {
  position: {
    vault            : '7c0c...7d4a',
    pair             : 'WETH/USDC',
    side             : 'LONG',
    openTimestamp    : Date.now(),
    closeTimestamp   : null,
    fundingToken     : 'USDC',
    collateralToken  : 'ETH',
    debtToken        : 'USDC',
    entryPrice       : 1000,
    iFundingUsd      : 1000,
    iCollateralUsd   : 2000,
    iDebtUsd         : 1000,
    iFundingAmt      : 1000,
    iCollateralAmt  : 2,
    iDebtAmt         : 1000,
    fFundingUsd      : null,
    fCollateralUsd   : null,
    fDebtUsd         : null,
    fFundingAmt      : null,
    fCollateralAmt   : null,
    fDebtAmt         : null,
    feeOpenPosition  : 0,
    feeOpenSwap      : 0,
    feeOpenZap       : 0,
    feeClosePosition : null,
    feeCloseSwap     : null,
    feeCloseZap      : null,
  }
}

export default PositionCard;
