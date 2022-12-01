import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Tooltip,
} from '@mui/material';

import AccountBar from './AccountBar';
import LoginButton from './LoginButton';
import useAuthStore from './../hooks/useAuth';
import useNetworkStore from './../hooks/useNetwork';

const TopBar = () => {
  const web3Available = useNetworkStore(state => state.web3Available);
  const user = useAuthStore(state => state.data);

  // TODO: add title of pages here
  return (
    <AppBar position="relative" color="transparent" elevation={0}>
      <Toolbar>
        <Box sx={{ marginLeft: 11 }} />
        <Box sx={{ flexGrow: 1 }} />
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
  );
};

export default TopBar;
