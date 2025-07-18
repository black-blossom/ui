import { useEffect, useState } from 'react';
import {
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
  Tooltip,
  Typography,
} from '@mui/material';
import { TrendingDown, TrendingUp } from '@mui/icons-material';
import { ethers } from 'ethers';

import { DEFAULT_CHAIN } from '../utils/chains';
import { USDC, Token } from '../utils/tokens';
import { PAIRS, TokenPair } from '../utils/pairs';
import { useChainId } from '../connectors/network';
import usePriceStore from '../hooks/usePrice';

const LONG  = 'LONG';
const SHORT = 'SHORT';

const UNISWAP_FEE = 0.0005;
const PROTOCOL_FEE = 0.001;
const FLASHLOAN_FEE = 0.0009;

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

export interface PositionInfo {
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
  feeFlashloan: number

  openTimestamp: number
  vault: string
};

interface IOpenPositionCardProps {
  pair: string
  handleOpenPosition: (info: PositionInfo) => void
};

const OpenPositionCard = ({ pair, handleOpenPosition }: IOpenPositionCardProps) => {
  const prices = usePriceStore(state => state.prices);

  const chainId = useChainId();

  const [tradeType, setTradeType] = useState<string>(LONG);

  // TODO: fix this
  const price: number = prices.get(pair) !== undefined ? prices.get(pair) : 0;
  const token0Price: number = prices.get(`${pair.split('/')[0]}/USD`) !== undefined ? prices.get(`${pair.split('/')[0]}/USD`) : 0;
  const token1Price: number = prices.get(`${pair.split('/')[1]}/USD`) !== undefined ? prices.get(`${pair.split('/')[1]}/USD`) : 0;

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
    feeFlashloan: 0,

    openTimestamp: Date.now(),
    vault: '',
  });

  useEffect(() => {
    setLeverageMultiplier(2.0);
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
    const value = Math.abs(Number(event.target.value));

    simulatePosition({ fundingAmount: value });
    setPayAmt(value);
  };

  const handleLeverageChanged = (event: Event, value: number | number[], activeThumb: number) => {
    if(typeof(value) !== 'number' || leverageMultiplier === value) return;

    simulatePosition({ leverageMultiplier: value });
    setLeverageMultiplier(value);
  };

  const handleOpenPositionButtonClicked = (info: PositionInfo) => {
    if(payAmt < 20) return;

    handleOpenPosition(info);
    setPayAmt(0);
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

    const protocolFee = openInfo.fundingAmount * leverageMultiplier * PROTOCOL_FEE;
    const zapFee = fundingToken.symbol === collateralToken.symbol ? 0 : (openInfo.fundingAmount - protocolFee) * UNISWAP_FEE;

    const debt2CollateralRate = collateralPriceUsd / debtPriceUsd;

    // we assume that funding is always USDC
    let collateralAmount = (openInfo.fundingAmount - protocolFee - zapFee) / collateralPriceUsd;

    // flashloan should include protocolFee, zapFee, and an estimation of swapFee
    let flashloan = (openInfo.fundingAmount * (openInfo.leverageMultiplier - 1) + zapFee + protocolFee) / debtPriceUsd;
    let swapFee = flashloan * UNISWAP_FEE;
    flashloan += swapFee;
    swapFee = flashloan * UNISWAP_FEE;
    const flashloanFee = flashloan * FLASHLOAN_FEE;

    collateralAmount += (flashloan - swapFee) / debt2CollateralRate;

    const debtAmount = flashloan + flashloanFee;

    // TODO: check the on-chain leverage result against the LTV
    // console.log(`on-chain leverage: ${collateralAmount * collateralPriceUsd / (collateralAmount * collateralPriceUsd - debtAmount * debtPriceUsd)}`);

    const openTimestamp = Date.now();

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
      feeSwap: swapFee * debtPriceUsd,
      feeProtocol: protocolFee,
      feeFlashloan: flashloanFee * debtPriceUsd,

      openTimestamp: openTimestamp,
      vault: ethers.utils.id(openTimestamp.toString()),
    });
  };

  const leverage = positionInfo.collateralUsd / positionInfo.fundingAmount;
  const netValueUsd = positionInfo.collateralUsd - positionInfo.debtUsd;
  let liquidationPrice = positionInfo.debtAmount / (positionInfo.collateralAmount * positionInfo.collateralToken.liquidationThreshold);
  if(positionInfo.tradeType === SHORT) liquidationPrice = 1 / liquidationPrice;
  const liquidationPercent = positionInfo.tradeType === LONG ?
    (positionInfo.entryPrice - liquidationPrice) / positionInfo.entryPrice * 100
    :
    (liquidationPrice - positionInfo.entryPrice) / positionInfo.entryPrice * 100;
  const totalFees = positionInfo.feeProtocol + positionInfo.feeZap + positionInfo.feeSwap + positionInfo.feeFlashloan;
  const pnl = positionInfo.fundingAmount - netValueUsd;
  const pnlPercentage = pnl / positionInfo.fundingAmount * 100;
  const breakevenPercentage = pnlPercentage / leverage;

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
              <Typography variant="body2">Leverage</Typography>
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

          <Button
            variant="outlined"
            disabled={payAmt < 20}
            onClick={() => handleOpenPositionButtonClicked(positionInfo)}
            fullWidth
          >
            Open Position
          </Button>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ height: 314, width: 1, p: 2 }}>

          <Box sx={{ m: 1 }} />

          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Pair</Typography>
                <Typography variant="body2">
                  {`${positionInfo.tokenPair.token0.symbol}/${positionInfo.tokenPair.token1.symbol}`}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Trade Type</Typography>
                <Typography variant="body2">{positionInfo.tradeType}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Tooltip
                title={(
                  <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Stack direction="column">
                      <Typography variant="caption">Net Value:</Typography>
                      <Typography variant="caption">Collateral:</Typography>
                      <Typography variant="caption">Debt:</Typography>
                    </Stack>

                    <Stack direction="column" alignItems="flex-end">
                      <Typography variant="caption">${netValueUsd.toFixed(2)}</Typography>
                      <Typography variant="caption">${positionInfo.collateralUsd.toFixed(2)}</Typography>
                      <Typography variant="caption">${positionInfo.debtUsd.toFixed(2)}</Typography>
                    </Stack>
                  </Stack>
                )}
              >
                <Stack direction="column" alignItems="center"  spacing={1}>
                  <Typography variant="caption">Net Value</Typography>
                  <Typography variant="body2">${netValueUsd.toFixed(0)}</Typography>
                </Stack>
              </Tooltip>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Funding</Typography>
                <Typography variant="body2">${positionInfo.fundingUsd.toFixed(0)}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Tooltip
                title={(
                  <Typography variant="caption">
                    {positionInfo.collateralAmount.toFixed(5)} {positionInfo.collateralToken.symbol}
                  </Typography>
                )}
              >
                <Stack direction="column" alignItems="center"  spacing={1}>
                  <Typography variant="caption">Position Size</Typography>
                  <Typography variant="body2">${positionInfo.collateralUsd.toFixed(0)}</Typography>
                </Stack>
              </Tooltip>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Leverage</Typography>
                <Typography variant="body2">
                  {leverage.toFixed(2)}x
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
              <Tooltip
                title={(
                  <Stack direction="column" spacing={1}>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="caption">Change in price required:</Typography>
                      <Typography variant="caption">
                        {positionInfo.tradeType === LONG ? '-' : '+'}{liquidationPercent.toFixed(2)}%
                      </Typography>
                    </Stack>
                    <Typography variant="caption">
                      This is the price at which the underlying Aave position can be liquidated. In a liquidation, up to 50% of the debt can be repaid and that value + liquidation penalty is taken from the collateral.
                    </Typography>
                  </Stack>
                )}
              >
                <Stack direction="column" alignItems="center"  spacing={1}>
                  <Typography variant="caption">Liq. Price</Typography>
                  <Typography variant="body2">
                    {liquidationPrice.toFixed(5)}
                  </Typography>
                </Stack>
              </Tooltip>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Liq. Penalty</Typography>
                <Typography variant="body2">{positionInfo.collateralToken.liquidationPenalty * 100}%</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Tooltip
                title={(
                  <Stack direction="column" spacing={1}>
                    <Typography variant="caption">
                      {positionInfo.collateralToken.symbol} is required for collateral.
                    </Typography>

                    <Stack direction="column">
                      <Typography variant="caption">Protocol Fee (0.1% of Position Size):</Typography>
                      <Typography variant="caption">${positionInfo.feeProtocol.toFixed(2)}</Typography>
                    </Stack>

                    { positionInfo.feeZap !== 0 && <Stack direction="column">
                      <Typography variant="caption">
                        Zap Fee (Funded {positionInfo.fundingToken.symbol} to {positionInfo.collateralToken.symbol}):
                      </Typography>
                      <Typography variant="caption">${positionInfo.feeZap.toFixed(2)}</Typography>
                    </Stack>}

                    <Stack direction="column">
                      <Typography variant="caption">FlashLoan Fee (0.09% of Borrowed):</Typography>
                      <Typography variant="caption">${positionInfo.feeFlashloan.toFixed(2)}</Typography>
                    </Stack>

                    <Stack direction="column">
                      <Typography variant="caption">
                        Swap Fee (Borrowed {positionInfo.debtToken.symbol} to {positionInfo.collateralToken.symbol}):
                      </Typography>
                      <Typography variant="caption">${positionInfo.feeSwap.toFixed(2)}</Typography>
                    </Stack>
                  </Stack>
                )}
              >
                <Stack direction="column" alignItems="center"  spacing={1}>
                  <Typography variant="caption">Fees</Typography>
                  <Typography variant="body2">
                    ${totalFees.toFixed(2)}
                  </Typography>
                </Stack>
              </Tooltip>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">PnL</Typography>
                <Typography variant="body2">
                  -{pnlPercentage.toFixed(2)}%
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="column" alignItems="center"  spacing={1}>
                <Typography variant="caption">Breakeven</Typography>
                <Typography variant="body2">+{breakevenPercentage.toFixed(2)}%</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OpenPositionCard;
