import {
  AppBar,
  Box,
  Stack,
  Toolbar,
} from '@mui/material';

import AccountBar from './AccountBar';
import LoginButton from './LoginButton';
import NetworkSelector from './NetworkSelector';
import useAuthStore from './../hooks/useAuth';

const TopBar = () => {
  const user = useAuthStore(state => state.data);

  // TODO: add title of pages here
  return (
    <AppBar position="relative" color="transparent" elevation={0}>
      <Toolbar>
        <Box sx={{ marginLeft: 11 }} />
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={2}>
          <NetworkSelector />
          { user.auth ? <AccountBar /> : <LoginButton /> }
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
