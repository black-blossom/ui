import { useEffect, useMemo } from 'react';
import Chart from '@qognicafinance/react-lightweight-charts';

import {
  Card,
  CardHeader,
  Paper,
  Stack,
} from '@mui/material';

import useHlocPrices from '../hooks/useHlocPrices';

const TradePage = () => {
  const candlestickSeries = useHlocPrices((state) => state.data);
  const useFetchHlocPrices = useHlocPrices((state) => state.fetch);

  const options = useMemo(() => {
    return ({
      alignLabels: true,
      timeScale: {
        rightOffset: 1,
        barSpacing: 7,
        fixLeftEdge: false,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        visible: true,
        timeVisible: true,
        secondsVisible: false
      },
      priceScale: {
        position: 'left',
        mode: 1,
        borderVisible: false,
      },
      crosshair: {
        mode: 0,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: 'rgba(255, 255, 255, 0.1)',
          visible: true,
        },
      },
      layout: {
        backgroundColor: '#121212',
        textColor: 'white',
        fontSize: 14,
      },
      handleScale: {
        axisPressedMouseMove: {
          time: true,
          price: false
        }
      },
    });
  }, []);

  useEffect(() => {
    useFetchHlocPrices();
  }, []);

  return (
    <Stack direction="column" alignItems="center">
      <Card variant="outlined" sx={{ width: 800 }}>
        <CardHeader title="ETH/USDC" />
        <Paper elevation={0} sx={{ marginLeft: 2, marginRight: 2, marginBottom: 2 }}>
          <Chart
            options={options}
            candlestickSeries={candlestickSeries}
            autoWidth
            height={320}
          />
        </Paper>
      </Card>
    </Stack>
  );
};

export default TradePage;
