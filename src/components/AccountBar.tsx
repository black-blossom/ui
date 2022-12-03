import {
  Avatar,
  ButtonBase,
  Stack,
  Typography,
} from '@mui/material';

import avatar from '../assets/avatar.png';
import NetworkStatusBadge from '../components/NetworkStatusBadge';
import useAuthStore from '../hooks/useAuth';
import { useAccounts } from '../connectors/metamask';

const AccountBar = () => {
  const user = useAuthStore(state => state.data);
  const accounts = useAccounts();

  const address = accounts ? `${accounts[0].slice(0, 5)}...${accounts[0].slice(38, 42)}` : '';

  // TODO: separate out the wallet info from the user avatar
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Stack direction="column" alignItems="center">
        <Typography variant="body2">{user.username}</Typography>
        <Typography variant="caption">{address}</Typography>
      </Stack>
      <ButtonBase>
        <NetworkStatusBadge>
          <Avatar src={avatar} sx={{ width: 40, height: 40 }} />
        </NetworkStatusBadge>
      </ButtonBase>
    </Stack>

  );
};

export default AccountBar;
