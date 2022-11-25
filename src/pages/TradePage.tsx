import {
  Card,
  CardHeader,
  Stack,
} from '@mui/material';

import TVChart from './../components/TVChart';

const TradePage = () => {

  return (
    <Stack direction="column" alignItems="center">
      <Card variant="outlined" sx={{ width: 800 }}>
        <CardHeader title="ETH/USDC" />
        <TVChart />
      </Card>
    </Stack>
  );
};

export default TradePage;
