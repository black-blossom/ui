import { useCallback, useState } from 'react';
import {
  Alert,
  Button,
  Link,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';

import LoginDialog from './LoginDialog';
import useAuthStore from '../hooks/useAuth';
import useNetworkStore from '../hooks/useNetwork';
import { useProvider } from '../connectors/metamask';

const LoginButton = () => {
  const connectWallet = useNetworkStore(state => state.connectWallet);
  const noMetamaskError = useNetworkStore(state => state.noMetamaskError);
  const useAuthenticate = useAuthStore(state => state.authenticate);
  const provider = useProvider();
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
        disabled={noMetamaskError}
      >
        Login
      </Button>
      <LoginDialog
        open={openDialog}
        handleCancel={ () => setOpenDialog(false) }
        handleConfirm={ async () => {
          if(!provider) return;

          const signer = provider.getSigner();
          const success = await useAuthenticate(signer);
          if(!success) return;
          setOpenDialog(false);
        } }
      />
      <Snackbar open={noMetamaskError} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
          severity="error"
          variant="filled"
        >
          <Stack direction="row" spacing={8}>
            <Typography variant="body1">MetaMask wallet required to login</Typography>
            <Link
              variant="button"
              underline="none"
              color="inherit"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
              target="_blank"
              rel="noopener"
            >
              Install MetaMask
            </Link>
          </Stack>
        </Alert>
      </Snackbar>
    </>
  )
};

export default LoginButton;
