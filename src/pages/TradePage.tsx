import { useMemo } from 'react';
import Chart from '@qognicafinance/react-lightweight-charts';

import {
  Card,
  CardHeader,
  Paper,
  Stack,
} from '@mui/material';

const TradePage = () => {
  const candlestickSeries = useMemo(() => {
    return ([{
        data: [
          { time: '2019-12-27', open: 126.36, high: 128.09, low: 124.82, close: 127.21 },
          { time: '2019-12-28', open: 127.21, high: 130.25, low: 126.89, close: 128.32 },
          { time: '2019-12-29', open: 128.26, high: 136.81, low: 127.99, close: 134.75 },
          { time: '2019-12-30', open: 134.79, high: 136.75, low: 131.54, close: 132.63 },
          { time: '2019-12-31', open: 132.61, high: 133.73, low: 128.79, close: 129.61 },
          { time: '2020-01-01', open: 129.63, high: 132.83, low: 129.19, close: 130.80 },
          { time: '2020-01-02', open: 130.82, high: 130.82, low: 126.95, close: 127.41 },
          { time: '2020-01-03', open: 127.41, high: 134.55, low: 126.49, close: 134.17 },
          { time: '2020-01-04', open: 134.16, high: 136.05, low: 133.04, close: 135.06 },
          { time: '2020-01-05', open: 135.07, high: 139.41, low: 135.04, close: 136.27 },
          { time: '2020-01-06', open: 136.30, high: 144.32, low: 136.07, close: 144.30 },
          { time: '2020-01-07', open: 144.31, high: 145.00, low: 140.48, close: 143.54 },
          { time: '2020-01-08', open: 143.48, high: 146.82, low: 138.26, close: 141.25 },
          { time: '2020-01-09', open: 141.15, high: 141.39, low: 136.23, close: 138.97 },
          { time: '2020-01-10', open: 138.96, high: 144.16, low: 135.52, close: 143.96 },
          { time: '2020-01-11', open: 143.40, high: 146.48, low: 142.20, close: 142.92 },
          { time: '2020-01-12', open: 143.03, high: 146.14, low: 142.70, close: 145.87 },
          { time: '2020-01-13', open: 146.22, high: 146.79, low: 142.90, close: 144.22 },
          { time: '2020-01-14', open: 144.25, high: 167.68, low: 144.06, close: 165.95 },
          { time: '2020-01-15', open: 165.73, high: 170.42, low: 161.10, close: 166.23 },
          { time: '2020-01-16', open: 166.33, high: 167.05, low: 159.70, close: 164.39 },
          { time: '2020-01-17', open: 164.48, high: 173.06, low: 162.77, close: 170.77 },
          { time: '2020-01-18', open: 170.74, high: 178.52, low: 166.78, close: 175.36 },
          { time: '2020-01-19', open: 175.46, high: 177.24, low: 163.67, close: 166.96 },
          { time: '2020-01-20', open: 166.90, high: 169.11, low: 162.33, close: 167.12 },
          { time: '2020-01-21', open: 167.06, high: 169.91, low: 165.81, close: 169.69 },
          { time: '2020-01-22', open: 169.60, high: 171.00, low: 166.77, close: 168.29 },
          { time: '2020-01-23', open: 168.29, high: 168.31, low: 160.29, close: 162.92 },
          { time: '2020-01-24', open: 162.89, high: 164.30, low: 156.74, close: 163.05 },
          { time: '2020-01-25', open: 163.06, high: 163.22, low: 158.63, close: 161.28 },
          { time: '2020-01-26', open: 161.17, high: 168.22, low: 160.28, close: 168.07 },
          { time: '2020-01-27', open: 168.00, high: 172.92, low: 166.90, close: 170.93 },
          { time: '2020-01-28', open: 170.88, high: 176.37, low: 170.73, close: 176.37 },
          { time: '2020-01-29', open: 176.34, high: 178.84, low: 175.05, close: 175.05 },
          { time: '2020-01-30', open: 174.91, high: 186.26, low: 172.37, close: 184.69 },
          { time: '2020-01-31', open: 184.73, high: 185.40, low: 176.29, close: 180.16 },
          { time: '2020-02-01', open: 180.11, high: 183.84, low: 179.74, close: 183.67 },
          { time: '2020-02-02', open: 183.53, high: 193.08, low: 180.17, close: 188.61 },
          { time: '2020-02-03', open: 188.60, high: 193.43, low: 188.01, close: 189.86 },
          { time: '2020-02-04', open: 189.86, high: 191.11, low: 185.40, close: 189.25 },
          { time: '2020-02-05', open: 189.29, high: 206.80, low: 188.75, close: 204.23 },
          { time: '2020-02-06', open: 204.12, high: 214.59, low: 201.90, close: 212.33 },
          { time: '2020-02-07', open: 212.31, high: 223.14, low: 212.30, close: 222.72 },
          { time: '2020-02-08', open: 222.51, high: 226.58, low: 215.38, close: 223.14 },
          { time: '2020-02-09', open: 222.98, high: 229.86, low: 222.98, close: 228.57 },
          { time: '2020-02-10', open: 228.54, high: 229.18, low: 218.08, close: 223.52 },
          { time: '2020-02-11', open: 223.38, high: 236.54, low: 218.61, close: 235.85 },
          { time: '2020-02-12', open: 235.89, high: 272.39, low: 235.89, close: 265.40 },
          { time: '2020-02-13', open: 265.05, high: 273.74, low: 258.92, close: 268.09 },
          { time: '2020-02-14', open: 268.02, high: 285.05, low: 262.76, close: 284.21 },
          { time: '2020-02-15', open: 284.56, high: 287.12, low: 264.27, close: 264.72 },
          { time: '2020-02-16', open: 264.90, high: 272.88, low: 242.48, close: 259.89 },
          { time: '2020-02-17', open: 259.89, high: 266.87, low: 244.33, close: 266.36 },
          { time: '2020-02-18', open: 266.50, high: 283.19, low: 261.46, close: 281.94 },
          { time: '2020-02-19', open: 282.03, high: 283.53, low: 259.76, close: 259.76 },
          { time: '2020-02-20', open: 259.81, high: 263.69, low: 250.95, close: 257.94 },
          { time: '2020-02-21', open: 257.89, high: 267.00, low: 255.68, close: 265.60 },
          { time: '2020-02-22', open: 265.55, high: 266.38, low: 258.91, close: 262.33 },
          { time: '2020-02-23', open: 262.27, high: 273.75, low: 261.96, close: 273.75 },
          { time: '2020-02-24', open: 273.70, high: 275.53, low: 259.62, close: 265.21 },
          { time: '2020-02-25', open: 265.28, high: 265.43, low: 246.85, close: 247.81 },
          { time: '2020-02-26', open: 247.74, high: 249.64, low: 221.26, close: 225.68 },
          { time: '2020-02-27', open: 225.68, high: 237.22, low: 212.66, close: 226.75 },
          { time: '2020-02-28', open: 226.98, high: 234.20, low: 216.34, close: 226.76 },
          { time: '2020-02-29', open: 226.83, high: 232.25, low: 219.84, close: 219.84 },
          { time: '2020-03-01', open: 219.75, high: 226.67, low: 214.13, close: 218.97 },
          { time: '2020-03-02', open: 218.71, high: 232.81, low: 217.28, close: 230.56 },
          { time: '2020-03-03', open: 230.52, high: 232.32, low: 221.73, close: 224.47 },
          { time: '2020-03-04', open: 224.56, high: 228.04, low: 222.08, close: 224.51 },
          { time: '2020-03-05', open: 224.64, high: 234.36, low: 224.64, close: 229.26 },
          { time: '2020-03-06', open: 229.16, high: 243.55, low: 228.74, close: 243.52 },
          { time: '2020-03-07', open: 243.75, high: 249.97, low: 237.55, close: 237.85 },
          { time: '2020-03-08', open: 237.78, high: 237.78, low: 200.60, close: 200.68 },
          { time: '2020-03-09', open: 201.31, high: 207.45, low: 192.26, close: 201.98 },
          { time: '2020-03-10', open: 202.86, high: 205.71, low: 198.06, close: 200.76 },
          { time: '2020-03-11', open: 200.76, high: 202.95, low: 184.36, close: 194.86 },
          { time: '2020-03-12', open: 194.73, high: 195.14, low: 111.21, close: 112.34 },
          { time: '2020-03-13', open: 112.68, high: 137.42, low: 95.184, close: 133.20 },
          { time: '2020-03-14', open: 133.58, high: 134.48, low: 122.41, close: 123.30 },
          { time: '2020-03-15', open: 123.24, high: 132.24, low: 121.85, close: 125.21 },
          { time: '2020-03-16', open: 124.99, high: 124.99, low: 105.17, close: 110.60 },
          { time: '2020-03-17', open: 110.40, high: 118.98, low: 110.40, close: 113.94 },
          { time: '2020-03-18', open: 113.85, high: 116.02, low: 111.74, close: 114.84 },
          { time: '2020-03-19', open: 114.83, high: 140.52, low: 114.73, close: 136.59 },
          { time: '2020-03-20', open: 136.64, high: 150.85, low: 122.60, close: 132.73 },
          { time: '2020-03-21', open: 133.10, high: 135.97, low: 127.16, close: 132.81 },
          { time: '2020-03-22', open: 132.85, high: 136.15, low: 122.90, close: 123.32 },
          { time: '2020-03-23', open: 123.36, high: 134.91, low: 121.86, close: 134.91 },
          { time: '2020-03-24', open: 135.19, high: 141.94, low: 133.16, close: 138.76 },
        ]
      }]);
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
