import { useState } from 'react';
import {
  Avatar,
  Badge,
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

interface IOpenPositionCardProps {
  pair: string;
};

const OpenPositionCard = ({ pair }: IOpenPositionCardProps) => {
  const [tradeType, setTradeType] = useState<string>(LONG);
  const [fundingAmount, setFundingAmount] = useState<number>(0);
  const [targetLeverage, setTargetLeverage] = useState<number>(2);

  const handleTradeTypeChanged = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => {
    if(!value) return;
    // TODO: rerun calcs

    setTradeType(value);
  };

  const handleFundingInputChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = Number(event.target.value);

    // TODO: rerun calcs

    setFundingAmount(value);
  };

  const handleLeverageChanged = (event: Event, value: number | number[], activeThumb: number) => {
    if(typeof(value) !== 'number' || targetLeverage === value) return;

    // TODO: rerun calcs
    setTargetLeverage(value);
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
              label="Fund Amount"
              placeholder="0.00"
              type="number"
              value={fundingAmount === 0 ? '' : fundingAmount.toString()}
              onChange={handleFundingInputChanged}
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
              <Typography variant="body2">{`${targetLeverage.toFixed(1)}x`}</Typography>
            </Stack>

            <Slider
              value={targetLeverage}
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
        <Paper variant="outlined" sx={{ width: 1, p: 2 }}>
          <Stack direction="column" justifyContent="space-between" sx={{ height: 280 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
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
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OpenPositionCard;
