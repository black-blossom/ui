import {
  Avatar,
  Badge,
  ButtonBase,
  Tooltip,
  Stack,
  Typography,
} from '@mui/material';

import avatar from './../assets/avatar.png';
import useAuthStore from './../hooks/useAuth';

const AccountBar = () => {
  const user = useAuthStore(state => state.data);

  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <Tooltip title="Connected to Polygon Mainnet" placement="left">
        <Badge color="success" badgeContent=" " variant="dot" style={{ display: 'block' }}></Badge>
      </Tooltip>
      <Stack direction="column" alignItems="center">
        <Typography>{user.username}</Typography>
        <Typography variant="caption">{`${user.address.slice(0, 5)}...${user.address.slice(38, 42)}`}</Typography>
      </Stack>
      <ButtonBase>
        <Avatar src={avatar} sx={{ width: 40, height: 40 }} />
      </ButtonBase>
    </Stack>

  );
};

export default AccountBar;
