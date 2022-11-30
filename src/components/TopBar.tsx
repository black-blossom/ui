import { useCallback, useState } from 'react';

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
import LoginDialog from './LoginDialog';
import useAuthStore from './../hooks/useAuth';
import useNetworkStore from './../hooks/useNetwork';

function TopBar() {
  const web3Available = useNetworkStore(state => state.web3Available);
  const connectWallet = useNetworkStore(state => state.connectWallet);
  const requestNetworkSwitch = useNetworkStore(state => state.requestNetworkSwitch);

  const user = useAuthStore(state => state.data);
  const useAuthenticate = useAuthStore(state => state.authenticate);
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogin = useCallback(async () => {
    const connected = await connectWallet();
    // TODO: let the user know that they must connect their wallet first
    if(!connected) return;

    setOpenDialog(true);
  }, []);

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
            sx={{ flexGrow: 1, marginLeft: 11, marginRight: 3 }}
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
          ) : web3Available ? (
            <Button variant="outlined" size="small" onClick={ () => handleLogin() }>Login</Button>
          ) : (
            <Tooltip title="No wallet available" placement="bottom">
              <span>
                <Button variant="outlined" size="small" disabled>Login</Button>
              </span>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>

      {/*
        TODO: this should be in App.tsx but we won't do this until we create the state management
              for auth
      */}
      <LoginDialog
        open={openDialog}
        handleCancel={ () => setOpenDialog(false) }
        handleConfirm={ () => {
          useAuthenticate();
          setOpenDialog(false);
          requestNetworkSwitch();
        } }
      />
    </>
  );
};

export default TopBar;
