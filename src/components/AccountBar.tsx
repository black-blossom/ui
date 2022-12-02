import {
  Avatar,
  ButtonBase,
  Stack,
  Typography,
} from '@mui/material';

import avatar from '../assets/avatar.png';
import NetworkStatusBadge from '../components/NetworkStatusBadge';
import useAuthStore from '../hooks/useAuth';

const AccountBar = () => {
  const user = useAuthStore(state => state.data);

  // TODO: separate out the wallet info from the user avatar
  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <Stack direction="column" alignItems="center">
        <Typography variant="body2">{user.username}</Typography>
        <Typography variant="caption">{`${user.address.slice(0, 5)}...${user.address.slice(38, 42)}`}</Typography>
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
