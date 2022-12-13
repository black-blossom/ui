import { useState } from 'react';
import {
  Container,
  Grid,
  SelectChangeEvent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import PairSelector from '../components/PairSelector';
import PositionCard from '../components/PositionCard';
import TVChart from '../components/TVChart';

const TradePage = () => {
  const [pair, setPair] = useState<string>('WETH/USDC');
  const [interval, setInterval] = useState<string>('1h');

  const handlePairChanged = (event: SelectChangeEvent) => {
    setPair(event.target.value);
  };

  const handleIntervalChanged = (event: React.MouseEvent<HTMLElement>, newInterval: string | null) => {
    if(newInterval) setInterval(newInterval);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <PairSelector selected={pair} onChange={handlePairChanged} />

            <Stack direction="column" alignItems="center">
              <Typography variant="caption">Market Price</Typography>
              <Typography variant="body2">$1262.42</Typography>
            </Stack>

            <Stack direction="column" alignItems="center">
              <Typography variant="caption">24h Change</Typography>
              <Typography variant="body2" color="palevioletred">-1.05%</Typography>
            </Stack>

            <ToggleButtonGroup
              value={interval}
              onChange={handleIntervalChanged}
              exclusive
            >
              <ToggleButton value="1h">
                <Typography variant="body2">1h</Typography>
              </ToggleButton>
              <ToggleButton value="4h">
                <Typography variant="body2">4h</Typography>
              </ToggleButton>
              <ToggleButton value="1d">
                <Typography variant="body2">1d</Typography>
              </ToggleButton>
              <ToggleButton value="3d">
                <Typography variant="body2">3d</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <TVChart />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <PositionCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <PositionCard />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TradePage;
