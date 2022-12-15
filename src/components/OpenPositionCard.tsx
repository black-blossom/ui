import { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { TrendingDown, TrendingUp } from '@mui/icons-material';

const LONG  = 'LONG';
const SHORT = 'SHORT';

const UNISWAP_FEE = 0.005;
const PROTOCOL_FEE = 0.001;
const FLASHLOAN_FEE = 0.009;

interface IOpennfo {
  pair?: string;
  tradeType?: string;
  payAmt?: number;
  leverageMult?: number;
};

interface IPositionInfo {
  fundAmt: number;
  cAmt   : number;
  dAmt   : number;
  pFee   : number;
  zFee   : number;
  sFee   : number;
  fFee   : number;
};

const defaultPositionInfo: IPositionInfo = {
  fundAmt: 0,
  cAmt   : 0,
  dAmt   : 0,
  pFee   : 0,
  zFee   : 0,
  sFee   : 0,
  fFee   : 0,
};

interface IOpenPositionCardProps {
  pair: string;
};

const OpenPositionCard = ({ pair }: IOpenPositionCardProps) => {
  // TODO: these should be hooks that actually work
  const getPrice = (pair: string) => {
    if(pair === 'WETH/USDC') return 1288.22;
    if(pair === 'WBTC/USDC') return 16683.84;
  };

  const [tradeType, setTradeType] = useState<string>(LONG);
  // const [payAmt, setPayAmt] = useState<number>(0);
  const [payAmt, setPayAmt] = useState<number>(1000);
  const [leverageMult, setLeverageMult] = useState<number>(2);

  const [positionInfo, setPositionInfo] = useState<IPositionInfo>(defaultPositionInfo);

  useEffect(() => {
    simulatePosition({ pair: pair });
  }, [pair]);

  const handleTradeTypeChanged = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => {
    if(!value) return;

    simulatePosition({ tradeType: value })
    setTradeType(value);
  };

  const handlePayAmtInputChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = Number(event.target.value);

    simulatePosition({ payAmt: value });
    setPayAmt(value);
  };

  const handleLeverageChanged = (event: Event, value: number | number[], activeThumb: number) => {
    if(typeof(value) !== 'number' || leverageMult === value) return;

    simulatePosition({ leverageMult: value });
    setLeverageMult(value);
  };

  const simulatePosition = (opi: IOpennfo) => {
    opi.pair = opi.pair !== undefined ? opi.pair : pair;
    opi.tradeType = opi.tradeType !== undefined ? opi.tradeType : tradeType;
    opi.payAmt = opi.payAmt !== undefined ? opi.payAmt : payAmt;
    opi.leverageMult = opi.leverageMult !== undefined ? opi.leverageMult : leverageMult;

    // calcualte the funding amount
    let fundAmt = opi.payAmt;

    const protocolFee = fundAmt * PROTOCOL_FEE;
    fundAmt -= protocolFee;

    const zapFee = fundAmt * UNISWAP_FEE;
    fundAmt -= zapFee;

    // calculate collateral and debt amounts
    const flashloan = fundAmt * (opi.leverageMult - 1);
    const flashloanFee = flashloan * FLASHLOAN_FEE;

    let cAmt = fundAmt;
    let dAmt = flashloan - flashloanFee;

    const swapFee = dAmt * UNISWAP_FEE;
    cAmt += (dAmt - swapFee);

    setPositionInfo({
      fundAmt: fundAmt,
      cAmt   : cAmt,
      dAmt   : dAmt,
      pFee   : protocolFee,
      zFee   : zapFee,
      sFee   : swapFee,
      fFee   : flashloanFee,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ width: 1, p: 2 }}>
          <Stack direction="column" justifyContent="space-between" sx={{ height: 280 }}>
            <ToggleButtonGroup
              value={tradeType}
              onChange={handleTradeTypeChanged}
              exclusive
              fullWidth
            >
              <ToggleButton value={LONG}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <TrendingUp />
                  <Typography variant="body2">{LONG}</Typography>
                </Stack>
              </ToggleButton>
              <ToggleButton value={SHORT}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <TrendingDown />
                  <Typography variant="body2">{SHORT}</Typography>
                </Stack>
              </ToggleButton>
            </ToggleButtonGroup>

            <TextField
              label="Pay"
              placeholder="0.00"
              type="number"
              value={payAmt === 0 ? '' : payAmt.toString()}
              onChange={handlePayAmtInputChanged}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="body2">USDC</Typography>
                  </InputAdornment>
                )
              }}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="body2">Leverage Multiplier</Typography>
              <Typography variant="body2">{`${leverageMult.toFixed(1)}x`}</Typography>
            </Stack>

            <Slider
              value={leverageMult}
              onChange={handleLeverageChanged}
              size="small"
              step={0.1}
              min={1.5}
              max={4}
            />

            <Button variant="outlined" fullWidth>Open Position</Button>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ height: 314, width: 1, p: 2 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              badgeContent={
                <Avatar
                  src={`/token-images/${pair.split('/')[1].toLowerCase()}.png`}
                  sx={{ width: 16, height: 16, bgcolor: 'white' }} 
                />
              }
            >
              <Avatar
                src={`/token-images/${pair.split('/')[0].toLowerCase()}.png`}
                sx={{ width: 36, height: 36, bgcolor: 'white' }}
              />
            </Badge>
            <Typography variant="body2">{tradeType} {pair}</Typography>
          </Stack>

          <Box sx={{ m: 3 }} />

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Funding</Typography>
                <Typography variant="body2">{positionInfo.fundAmt.toFixed(2)}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Position Size</Typography>
                <Typography variant="body2">{positionInfo.cAmt.toFixed(2)}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Leverage Mult</Typography>
                <Typography variant="body2">
                  {(positionInfo.cAmt / (positionInfo.cAmt - positionInfo.dAmt)).toFixed(3)}x
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Entry Price</Typography>
                <Typography variant="body2">{getPrice(pair)}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Liq. Price</Typography>
                <Typography variant="body2">0</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Liq. Penalty</Typography>
                <Typography variant="body2">5%</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Protocol Fee</Typography>
                <Typography variant="body2">{positionInfo.pFee.toFixed(2)}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Zap Fee</Typography>
                <Typography variant="body2">{positionInfo.zFee.toFixed(2)}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Swap Fee</Typography>
                <Typography variant="body2">{positionInfo.sFee.toFixed(2)}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OpenPositionCard;
