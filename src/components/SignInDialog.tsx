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

const SignInDialog = ({ open, handleCancel, handleConfirm }: SignInDialogProps) => {

  return (
    <Dialog open={open}>
      <DialogContent sx={{ maxWidth: 400 }}>
        <Stack direction="column" spacing={4}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Avatar src={metamaskLogo} sx={{ width: 36, height: 36 }} />
            <Typography variant="h6">
              Sign in with Metamask
            </Typography>
            <IconButton onClick={ () => handleCancel() }>
              <Clear />
            </IconButton>
          </Stack>

          <Stack direction="column" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Verified />
              <Typography variant="body2">
                Your signature verfies that you are the owner of this address
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Handshake />
              <Typography variant="body2">
                Sign to approve our Terms of Service & Privacy Policy
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              <LocalGasStation />
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
            Sign In
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
