import {
  Card,
  Grid,
} from '@mui/material';

import PositionCard from '../components/PositionCard';
import TVChart from '../components/TVChart';

const TradePage = () => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card variant="outlined" sx={{ width: 1 }}>
          <TVChart />
        </Card>
      </Grid>

      <Grid item xs={12}>
        <PositionCard />
      </Grid>
    </Grid>
  );
};

export default TradePage;
