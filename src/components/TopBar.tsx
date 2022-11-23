import { useState } from 'react';

import {
  AppBar,
  Avatar,
  Badge,
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import {
  ClearOutlined,
  SearchOutlined,
} from '@mui/icons-material';

import avatar from './../assets/avatar.png';
import SignInDialog from './SignInDialog';

function TopBar() {
  const [auth, setAuth] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <AppBar color="transparent" sx={{ boxShadow: 'none' }}>
        <Toolbar>
          <TextField
            placeholder="Search"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ marginRight: 2 }}>
                  <SearchOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ flexGrow: 1, marginLeft: 16, marginRight: 8 }}
          />
          { auth ? (
            <Stack direction="row" alignItems="center" spacing={3}>
              <Tooltip title="Connected to Polygon Mainnet" placement="left">
                <Badge color="success" badgeContent=" " variant="dot"></Badge>
              </Tooltip>
              <Stack direction="column" alignItems="center">
                <Typography>Godyl</Typography>
                <Typography variant="caption">0x106...213C</Typography>
              </Stack>
              <ButtonBase>
                <Avatar src={avatar} sx={{ width: 40, height: 40 }} />
              </ButtonBase>
            </Stack>
          ) : (
            <Button variant="outlined" size="small" onClick={ () => setOpenDialog(true) }>Sign in with Wallet</Button>
          ) }
        </Toolbar>
      </AppBar>

      {/*
        TODO: this should be in App.tsx but we won't do this until we create the state management
              for auth
      */}
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
