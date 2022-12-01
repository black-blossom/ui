import {
  Avatar,
  Badge,
  ButtonBase,
  Stack,
  Typography,
} from '@mui/material';

import avatar from './../assets/avatar.png';
import useAuthStore from './../hooks/useAuth';

const AccountBar = () => {
  const user = useAuthStore(state => state.data);

  // TODO: badge should display if wallet is connected to correct network
  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <Stack direction="column" alignItems="center">
        <Typography variant="body2">{user.username}</Typography>
        <Typography variant="caption">{`${user.address.slice(0, 5)}...${user.address.slice(38, 42)}`}</Typography>
      </Stack>
      <ButtonBase>
        <Badge color="success" overlap="circular" variant="dot">
          <Avatar src={avatar} sx={{ width: 40, height: 40 }} />
        </Badge>
      </ButtonBase>
    </Stack>

  );
};

export default AccountBar;
