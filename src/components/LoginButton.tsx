import { useCallback, useState } from 'react';
import { Button } from '@mui/material';

import LoginDialog from './LoginDialog';
import useAuthStore from './../hooks/useAuth';
import useNetworkStore from './../hooks/useNetwork';

const LoginButton = () => {
  const connectWallet = useNetworkStore(state => state.connectWallet);
  const useAuthenticate = useAuthStore(state => state.authenticate);
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogin = useCallback(
    async () => {
      const connected = await connectWallet();
      if(!connected) return;

      setOpenDialog(true);
    }, []
  );

  return (
    <>
      <Button
        variant="outlined"
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
        } }
      />
    </>
  )
};

export default LoginButton;
