import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import {
  Clear,
  Handshake,
  LocalGasStation,
  Verified,
} from '@mui/icons-material'

import metamaskLogo from './../assets/metamask.png';

interface SignInDialogProps {
  open: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
};

const LoginDialog = ({ open, handleCancel, handleConfirm }: SignInDialogProps) => {

  return (
    <Dialog open={open}>
      <DialogContent sx={{ maxWidth: 400 }}>
        <Stack direction="column" spacing={4}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Avatar src={metamaskLogo} sx={{ width: 40, height: 40 }} />
            <Typography variant="h6">
              Login with your Wallet
            </Typography>
            <IconButton onClick={ () => handleCancel() }>
              <Clear />
            </IconButton>
          </Stack>

          <Stack direction="column" spacing={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: 'lightgray' }}>
                <Verified />
              </Avatar>
              <Typography variant="body2">
                Your signature verfies that you are the owner of this address
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: 'lightgray' }}>
                <Handshake />
              </Avatar>
              <Typography variant="body2">
                Sign to approve our Terms of Service & Privacy Policy
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: 'lightgray' }}>
                <LocalGasStation />
              </Avatar>
              <Typography variant="body2">
                No gas fee when signing
              </Typography>
            </Stack>
          </Stack>

          <Button
            variant="outlined"
            size="small"
            onClick={ () => handleConfirm() }
            fullWidth
          >
            Sign with Wallet
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
