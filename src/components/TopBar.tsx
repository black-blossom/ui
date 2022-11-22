import { useState } from 'react';

import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

import logo from './../assets/logo.png';
import avatar from './../assets/avatar.png';
import SignInDialog from './SignInDialog';

function TopBar() {
  const [auth, setAuth] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
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
            <Button variant="outlined" size="small" onClick={ () => setOpenDialog(true) }>Sign in with Wallet</Button>
          ) }
        </Toolbar>
      </AppBar>

      // TODO: this should be in App.tsx but we won't do this until we create the state management
      //       for auth
      <SignInDialog
        open={openDialog}
        handleCancel={ () => setOpenDialog(false) }
        handleConfirm={ () => {
          setAuth(true);
          setOpenDialog(false);
        } }
      />
    </>
  );
};

export default TopBar;
