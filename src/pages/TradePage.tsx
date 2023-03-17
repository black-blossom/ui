import { useState } from 'react';
import {
  Container,
  Grid,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';

import { PositionInfo } from '../components/OpenPositionCard';
import { getLocalStorage, setLocalStorage } from '../utils/localstorge';
import IntervalButtonGroup from '../components/IntervalButtonGroup';
import OpenPositionCard from '../components/OpenPositionCard';
import PairSelector from '../components/PairSelector';
import PositionCard from '../components/PositionCard';
import TVChart from '../components/TVChart';
import usePriceStore from '../hooks/usePrice';

const TradePage = () => {
  const prices = usePriceStore(state => state.prices);

  const [pair, setPair] = useState<string>('ETH/USD');
  const [interval, setInterval] = useState<string>('1h');
  const [openPositions, setOpenPositions] = useState<PositionInfo[]>(getLocalStorage('openPositions', []));

  const pairPrice = prices.get(pair) !== undefined ? prices.get(pair) : 0;

  const handlePairChanged = (event: SelectChangeEvent) => {
    setPair(event.target.value);
  };

  const handleIntervalChanged = (event: React.MouseEvent<HTMLElement>, newInterval: string | null) => {
    if(newInterval) setInterval(newInterval);
  };

  const handleOpenPosition = (info: PositionInfo) => {
    const positions = [info, ...openPositions];
    setOpenPositions(positions);
    setLocalStorage('openPositions', positions);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <PairSelector selected={pair} onChange={handlePairChanged} />

            <Stack direction="column" alignItems="center">
              <Typography variant="caption">Market Price</Typography>
              <Typography variant="body2">${pairPrice?.toFixed(5)}</Typography>
            </Stack>

            <Stack direction="column" alignItems="center">
              <Typography variant="caption">24h Change</Typography>
              <Typography variant="body2" color="palevioletred">-1.05%</Typography>
            </Stack>

            <IntervalButtonGroup selected={interval} onChange={handleIntervalChanged} />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <TVChart />
        </Grid>

        <Grid item xs={12}>
          <OpenPositionCard pair={pair} handleOpenPosition={handleOpenPosition} />
        </Grid>

        {openPositions.map((info, index) => {
          console.log(info);
          return (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <PositionCard position={info} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default TradePage;
