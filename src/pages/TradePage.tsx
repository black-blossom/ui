import { useState } from 'react';
import {
  Avatar,
  Badge,
  Container,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import PositionCard from '../components/PositionCard';
import TVChart from '../components/TVChart';

const TradePage = () => {
  const [pair, setPair] = useState<string>('WETH/USDC');
  const [interval, setInterval] = useState<string>('1h');

  const handlePairChanged = (event: React.MouseEvent<HTMLElement>, newPair: string | null) => {
    if(newPair) setPair(newPair);
  };

  const handleIntervalChanged = (event: React.MouseEvent<HTMLElement>, newInterval: string | null) => {
    if(newInterval) setInterval(newInterval);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <ToggleButtonGroup
              value={pair}
              onChange={handlePairChanged}
              exclusive
            >
              <ToggleButton value="WETH/USDC">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  badgeContent={
                    <Avatar src="/token-images/usdc.png" style={{ width: 14, height: 14 }} />
                  }
                >
                  <Avatar src="/token-images/weth.png" sx={{ width: 28, height: 28 }} />
                </Badge>
              </ToggleButton>
              <ToggleButton value="WBTC/USDC">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  badgeContent={
                    <Avatar src="/token-images/usdc.png" style={{ width: 14, height: 14 }} />
                  }
                >
                  <Avatar src="/token-images/wbtc.png" sx={{ width: 28, height: 28 }} />
                </Badge>
              </ToggleButton>
              <ToggleButton value="WETH/WBTC">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  badgeContent={
                    <Avatar src="/token-images/wbtc.png" style={{ width: 14, height: 14 }} />
                  }
                >
                  <Avatar src="/token-images/weth.png" sx={{ width: 28, height: 28 }} />
                </Badge>
              </ToggleButton>
            </ToggleButtonGroup>

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
              <ToggleButton value="1h">1h</ToggleButton>
              <ToggleButton value="4h">4h</ToggleButton>
              <ToggleButton value="1d">1d</ToggleButton>
              <ToggleButton value="3d">3d</ToggleButton>
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
