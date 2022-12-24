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

import { DEFAULT_CHAIN } from '../utils/chains';
import { USDC, Token } from '../utils/tokens';
import { PAIRS, TokenPair } from '../utils/pairs';
import { useChainId } from '../connectors/network';
import getPrice from '../utils/getPrice';

const LONG  = 'LONG';
const SHORT = 'SHORT';

const UNISWAP_FEE = 0.005;
const PROTOCOL_FEE = 0.001;
const FLASHLOAN_FEE = 0.009;

interface OpenInfo {
  pair?: string
  price?: number
  tradeType?: string

  token0Price?: number
  token1Price?: number

  fundingAmount?: number
  fundingToken?: Token

  leverageMultiplier?: number;
};

interface PositionInfo {
  tokenPair: TokenPair
  tradeType: string
  entryPrice: number

  fundingToken: Token
  collateralToken: Token
  debtToken: Token

  fundingUsd: number
  fundingAmount: number

  collateralUsd: number
  collateralAmount: number

  debtUsd: number
  debtAmount: number

  feeZap: number
  feeSwap: number
  feeProtocol: number
};

interface IOpenPositionCardProps {
  pair: string;
};

const OpenPositionCard = ({ pair }: IOpenPositionCardProps) => {
  const chainId = useChainId();

  const [price, setPrice] = useState<number>(0);
  const [tradeType, setTradeType] = useState<string>(LONG);

  const [token0Price, setToken0Price] = useState<number>(0);
  const [token1Price, setToken1Price] = useState<number>(0);

  const [payAmt, setPayAmt] = useState<number>(0);
  const fundingToken = USDC[chainId ? chainId : DEFAULT_CHAIN];

  const [leverageMultiplier, setLeverageMultiplier] = useState<number>(2);

  const [positionInfo, setPositionInfo] = useState<PositionInfo>({
    tokenPair: PAIRS[chainId ? chainId : DEFAULT_CHAIN][pair],
    tradeType: tradeType,
    entryPrice: price,

    fundingToken: fundingToken,
    collateralToken: fundingToken,
    debtToken: fundingToken,

    fundingUsd: 0,
    fundingAmount: 0,

    collateralUsd: 0,
    collateralAmount: 0,

    debtUsd: 0,
    debtAmount: 0,

    feeZap: 0,
    feeSwap: 0,
    feeProtocol: 0,
  });

  useEffect(() => {
    if(chainId === undefined) return;

    const fetchPrices = async () => {
      // fetch pair price, token0 usd price and token1 usd price
      const prices = await Promise.all([
        getPrice(pair, chainId),
        getPrice(`${pair.split('/')[0]}/USD`, chainId),
        getPrice(`${pair.split('/')[1]}/USD`, chainId),
      ]);

      setPrice(prices[0]);
      setToken0Price(prices[1]);
      setToken1Price(prices[2]);
    };

    fetchPrices();

    // sub
    const updatePrices = window.setInterval(() => fetchPrices(), 5000);

    // unsub
    return () => clearInterval(updatePrices);
  }, [pair, chainId]);

  // TODO: new pair's max leverage should be checked against selected leverage multiplier
  useEffect(() => {
    simulatePosition({ pair: pair });
  }, [pair]);

  useEffect(() => {
    simulatePosition({
      price: price,
      token0Price: token0Price,
      token1Price: token1Price,
    });
  }, [price, token0Price, token1Price]);

  const handleTradeTypeChanged = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => {
    if(!value) return;

    simulatePosition({ tradeType: value })
    setTradeType(value);
  };

  const handlePayAmtInputChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = Number(event.target.value);

    simulatePosition({ fundingAmount: value });
    setPayAmt(value);
  };

  const handleLeverageChanged = (event: Event, value: number | number[], activeThumb: number) => {
    if(typeof(value) !== 'number' || leverageMultiplier === value) return;

    simulatePosition({ leverageMultiplier: value });
    setLeverageMultiplier(value);
  };

  const simulatePosition = async (openInfo: OpenInfo) => {
    if(!chainId) return;

    if(openInfo.pair      === undefined) openInfo.pair      = pair;
    if(openInfo.price     === undefined) openInfo.price     = price;
    if(openInfo.tradeType === undefined) openInfo.tradeType = tradeType;

    if(openInfo.token0Price === undefined) openInfo.token0Price = token0Price;
    if(openInfo.token1Price === undefined) openInfo.token1Price = token1Price;

    if(openInfo.fundingAmount === undefined) openInfo.fundingAmount = payAmt;
    if(openInfo.fundingToken  === undefined) openInfo.fundingToken  = fundingToken;

    if(openInfo.leverageMultiplier === undefined) openInfo.leverageMultiplier = leverageMultiplier;

    const tokenPair = PAIRS[chainId][openInfo.pair];
    const collateralToken = openInfo.tradeType === LONG ? tokenPair.token0 : tokenPair.token1;
    const debtToken       = openInfo.tradeType === LONG ? tokenPair.token1 : tokenPair.token0;

    const collateralPriceUsd = openInfo.tradeType === LONG ? openInfo.token0Price : openInfo.token1Price;
    const debtPriceUsd       = openInfo.tradeType === LONG ? openInfo.token1Price : openInfo.token0Price;

    let amountUsd = openInfo.fundingAmount;

    const protocolFee = amountUsd * PROTOCOL_FEE;
    amountUsd -= protocolFee;

    const zapFee = amountUsd * UNISWAP_FEE;
    amountUsd -= zapFee;

    let collateralAmount = amountUsd / collateralPriceUsd;

    // flashloan should include protocolFee, zapFee, and an estimation of swapFee
    let flashloan = openInfo.fundingAmount * (openInfo.leverageMultiplier - 1) + zapFee + protocolFee;
    let swapFee = flashloan * UNISWAP_FEE;
    flashloan += swapFee;
    swapFee = flashloan * UNISWAP_FEE;
    const flashloanFee = flashloan * FLASHLOAN_FEE;

    collateralAmount += (flashloan - swapFee) / collateralPriceUsd;

    const debtAmount = flashloan + flashloanFee;

    // TODO: check the on-chain leverage result against the LTV
    console.log(`on-chain leverage: ${collateralAmount * collateralPriceUsd / (collateralAmount * collateralPriceUsd - debtAmount * debtPriceUsd)}`);

    console.log({
      tokenPair: tokenPair,
      tradeType: openInfo.tradeType,
      entryPrice: openInfo.price,

      fundingToken: openInfo.fundingToken,
      collateralToken: collateralToken,
      debtToken: debtToken,

      fundingUsd: openInfo.fundingAmount,
      fundingAmount: openInfo.fundingAmount,

      collateralUsd: collateralAmount * collateralPriceUsd,
      collateralAmount: collateralAmount,

      debtUsd: debtAmount * debtPriceUsd,
      debtAmount: debtAmount,

      feeZap: zapFee,
      feeSwap: swapFee,
      feeProtocol: protocolFee,
    });

    setPositionInfo({
      tokenPair: tokenPair,
      tradeType: openInfo.tradeType,
      entryPrice: openInfo.price,

      fundingToken: openInfo.fundingToken,
      collateralToken: collateralToken,
      debtToken: debtToken,

      fundingUsd: openInfo.fundingAmount,
      fundingAmount: openInfo.fundingAmount,

      collateralUsd: collateralAmount * collateralPriceUsd,
      collateralAmount: collateralAmount,

      debtUsd: debtAmount * debtPriceUsd,
      debtAmount: debtAmount,

      feeZap: zapFee,
      feeSwap: swapFee,
      feeProtocol: protocolFee,
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
              <Typography variant="body2">{`${leverageMultiplier.toFixed(1)}x`}</Typography>
            </Stack>

            <Slider
              value={leverageMultiplier}
              onChange={handleLeverageChanged}
              size="small"
              step={0.1}
              min={1.5}
              max={positionInfo.collateralToken.maxLeverage}
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
                  src={positionInfo.tokenPair.token1.logoSrc}
                  sx={{ width: 16, height: 16, bgcolor: 'white' }} 
                />
              }
            >
              <Avatar
                src={positionInfo.tokenPair.token0.logoSrc}
                sx={{ width: 36, height: 36, bgcolor: 'white' }}
              />
            </Badge>
            <Typography variant="body2">{tradeType} {`${positionInfo.tokenPair.token0.symbol}/${positionInfo.tokenPair.token1.symbol}`}</Typography>
          </Stack>

          <Box sx={{ m: 3 }} />

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Funding</Typography>
                <Typography variant="body2">{positionInfo.fundingUsd.toFixed(0)}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Position Size</Typography>
                <Typography variant="body2">{positionInfo.collateralUsd.toFixed(0)}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Leverage Mult.</Typography>
                <Typography variant="body2">
                  {(positionInfo.collateralUsd / positionInfo.fundingUsd).toFixed(2)}x
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Entry Price</Typography>
                <Typography variant="body2">{positionInfo.entryPrice}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Liq. Price</Typography>
                <Typography variant="body2">
                  {(positionInfo.debtAmount / (positionInfo.collateralAmount * positionInfo.collateralToken.liquidationThreshold)).toFixed(2)}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Liq. Penalty</Typography>
                <Typography variant="body2">{positionInfo.collateralToken.liquidationPenalty * 100}%</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Protocol Fee</Typography>
                <Typography variant="body2">{positionInfo.feeProtocol.toFixed(2)}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Zap Fee</Typography>
                <Typography variant="body2">{positionInfo.feeZap.toFixed(2)}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Swap Fee</Typography>
                <Typography variant="body2">{positionInfo.feeSwap.toFixed(2)}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OpenPositionCard;
