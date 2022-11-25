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
import useAuthStore from './../hooks/useAuth';

function TopBar() {
  const user = useAuthStore(state => state.data);
  const useAuthenticate = useAuthStore(state => state.authenticate);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <AppBar position="relative" color="transparent" elevation={0}>
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
          { user.auth ? (
            <Stack direction="row" alignItems="center" spacing={3}>
              <Tooltip title="Connected to Polygon Mainnet" placement="left">
                <Badge color="success" badgeContent=" " variant="dot"></Badge>
              </Tooltip>
              <Stack direction="column" alignItems="center">
                <Typography>{user.username}</Typography>
                <Typography variant="caption">{`${user.address.slice(0, 5)}...${user.address.slice(38, 42)}`}</Typography>
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
          useAuthenticate();
          setOpenDialog(false);
        } }
      />
    </>
  );
};

export default TopBar;
