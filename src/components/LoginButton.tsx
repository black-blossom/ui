import { useCallback, useState } from 'react';
import { Button } from '@mui/material';

import LoginDialog from './LoginDialog';
import useAuthStore from './../hooks/useAuth';
import useNetworkStore from './../hooks/useNetwork';

const LoginButton = () => {
  const connectWallet = useNetworkStore(state => state.connectWallet);
  const requestNetworkSwitch = useNetworkStore(state => state.requestNetworkSwitch);
  const useAuthenticate = useAuthStore(state => state.authenticate);
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogin = useCallback(
    async () => {
      const connected = await connectWallet();
      // TODO: let the user know that they must connect their wallet first
      if(!connected) return;

      setOpenDialog(true);
    }, []
  );

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={handleLogin}
      >
        Login
      </Button>
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
  )
};

export default LoginButton;
