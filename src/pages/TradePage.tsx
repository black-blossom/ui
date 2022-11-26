import {
  Card,
  Stack,
} from '@mui/material';

import TVChart from './../components/TVChart';

const TradePage = () => {

  return (
    <Stack direction="column" alignItems="center">
      <Card variant="outlined" sx={{ width: 1 }}>
        <TVChart />
      </Card>
    </Stack>
  );
};

export default TradePage;
