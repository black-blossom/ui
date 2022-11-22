import { useState } from 'react';

import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import logo from './../assets/logo.png';
import avatar from './../assets/avatar.png';

function TopBar() {
  const [auth, setAuth] = useState(false);

  return (
    <AppBar>
      <Toolbar>
        <Avatar src={logo} sx={{ bgcolor: 'white', width: 36, height: 36, marginRight: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Black Blossom</Typography>
        { auth ? (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Badge color="success" badgeContent=" " variant="dot"></Badge>
            <Typography>Godyl</Typography>
            <Avatar src={avatar} sx={{ width: 36, height: 36 }} />
          </Stack>
        ) : (
          <Tooltip title="Sigin">
            <Button variant="outlined" size="small" onClick={ () => setAuth(true) }>Sign in with wallet</Button>
          </Tooltip>
        ) }
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
