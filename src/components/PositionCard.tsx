import {
  Avatar,
  Badge,
  Button,
  Box,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { PositionInfo } from './OpenPositionCard';

const LONG  = 'LONG';
const SHORT = 'SHORT';

interface IPositionCardProps {
  position: PositionInfo;
}

const PositionCard = ({ position }: IPositionCardProps) => {
  const currentPrice = 1255;

  const fundingPriceUsd = 1;
  const collateralPriceUsd = position.tradeType === LONG ? 1255 : 1;
  const debtPriceUsd = position.tradeType === LONG ? 1 : 1255;

  const collateralUsd = position.collateralAmount * collateralPriceUsd;
  const debtUsd = position.debtAmount * debtPriceUsd;

  const initialNetValueUsd = position.collateralUsd - position.debtUsd;
  const currentNetValueUsd = collateralUsd - debtUsd;

  let liquidationPrice = position.debtAmount / (position.collateralAmount * position.collateralToken.liquidationThreshold);
  if(position.tradeType === SHORT) liquidationPrice = 1 / liquidationPrice;
  const liquidationPercent = position.tradeType === LONG ?
    (currentPrice - liquidationPrice) / currentPrice * 100
    :
    (liquidationPrice - currentPrice) / currentPrice * 100;

  const pnl = currentNetValueUsd - position.fundingUsd;
  const pnlPercentage = pnl / position.fundingUsd * 100;

  const leverage = position.collateralUsd / position.fundingUsd;

  const vaultAddress = `${position.vault.slice(0, 5)}...${position.vault.slice(38, 42)}`;

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
          <Typography variant="body2">
            {position.tradeType} {position.tokenPair.token0.symbol}/{position.tokenPair.token1.symbol}
          </Typography>
          <Typography variant="caption">
            {vaultAddress}
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ m: 3 }} />

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Tooltip
            title={(
              <Typography variant="caption">
                {position.collateralAmount.toFixed(5)} {position.collateralToken.symbol}
              </Typography>
            )}
          >
            <Stack direction="column" alignItems="center"  spacing={1}>
              <Typography variant="caption">Position Size</Typography>
              <Typography variant="body2">${collateralUsd.toFixed(0)}</Typography>
            </Stack>
          </Tooltip>
        </Grid>

        <Grid item xs={4}>
          <Stack direction="column" alignItems="center"  spacing={1}>
            <Typography variant="caption">Current Price</Typography>
            <Typography variant="body2">${currentPrice.toFixed(5)}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack direction="column" alignItems="center"  spacing={1}>
            <Typography variant="caption">Entry Price</Typography>
            <Typography variant="body2">${position.entryPrice.toFixed(5)}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Tooltip
            title={(
              <Stack direction="column" spacing={1}>
                <Stack direction="row" spacing={2}>
                  <Stack direction="column">
                    <Typography variant="caption">Change in price required:</Typography>
                    <Typography variant="caption">Liquidation Penalty:</Typography>
                  </Stack>
                  <Stack direction="column" justifyContent="flex-end">
                    <Typography variant="caption">
                      {position.tradeType === LONG ? '-' : '+'}{liquidationPercent.toFixed(2)}%
                    </Typography>
                    <Typography variant="caption">
                      {(position.collateralToken.liquidationPenalty * 100).toFixed(2)}%
                    </Typography>
                  </Stack>
                </Stack>
                <Typography variant="caption">
                  This is the price at which the underlying Aave position can be liquidated. In a liquidation, up to 50% of the debt can be repaid and that value + liquidation penalty is taken from the collateral.
                </Typography>
              </Stack>
            )}
          >
            <Stack direction="column" alignItems="center"  spacing={1}>
              <Typography variant="caption">Liq. Price</Typography>
              <Typography variant="body2">${liquidationPrice.toFixed(5)}</Typography>
            </Stack>
          </Tooltip>
        </Grid>

        <Grid item xs={4}>
          <Stack direction="column" alignItems="center"  spacing={1}>
            <Typography variant="caption">PnL</Typography>
            <Typography variant="body2" color={pnlPercentage < 0 ? 'palevioletred' : 'lightgreen'}>
              {pnlPercentage.toFixed(2)}%
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack direction="column" alignItems="center"  spacing={1}>
            <Typography variant="caption">Leverage</Typography>
            <Typography variant="body2">{leverage.toFixed(2)}x</Typography>
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

export default PositionCard;
