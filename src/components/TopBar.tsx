import {
  AppBar,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
} from '@mui/material';

import {
  ClearOutlined,
  SearchOutlined,
} from '@mui/icons-material';

import AccountBar from './AccountBar';
import LoginButton from './LoginButton';
import useAuthStore from './../hooks/useAuth';
import useNetworkStore from './../hooks/useNetwork';

const TopBar = () => {
  const web3Available = useNetworkStore(state => state.web3Available);
  const user = useAuthStore(state => state.data);

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
            <AccountBar />
          ) : web3Available ? (
            <LoginButton />
          ) : (
            <Tooltip title="No wallet available" placement="bottom">
              <span>
                <Button variant="outlined" size="small" disabled>Login</Button>
              </span>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar;
