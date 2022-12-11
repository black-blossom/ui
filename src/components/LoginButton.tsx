import { useState } from 'react';
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
  const useFirebaseAuth = useAuthStore(state => state.firebaseAuth);
  const provider = useProvider();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoginInProgress(true);

    const connected = await connectWallet();
    if(!connected) return;

    setOpenDialog(true);
  };

  const handleCancel = () => {
    setLoginInProgress(false);
    setOpenDialog(false);
  };

  const handleConfirm = async () => {
    if(!provider) return;

    const signer = provider.getSigner();
    let success = await useAuthenticate(signer);
    if(!success) return;

    success = await useFirebaseAuth();
    if(!success) return;

    handleCancel();
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleLogin}
        disabled={noMetamaskError || loginInProgress}
      >
        Login
      </Button>
      <LoginDialog
        open={openDialog}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
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
