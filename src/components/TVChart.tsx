import { useEffect, useMemo } from 'react';
import Chart from '@qognicafinance/react-lightweight-charts';
import { Card, Paper } from '@mui/material';

import useHlocPrices from '../hooks/useHlocPrices';

const TVChart = () => {
  const data = useHlocPrices((state) => state.data);
  const useFetchPrices = useHlocPrices((state) => state.fetch);

  useEffect(() => {
    useFetchPrices();
  }, []);

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

  return (
    <Card variant="outlined" sx={{ width: 1 }}>
      <Paper elevation={0} sx={{ m: 2 }}>
        <Chart
          options={options}
          candlestickSeries={data}
          darkTheme={true}
          autoWidth
          height={320}
        />
      </Paper>
    </Card>
  );
};

export default TVChart;
