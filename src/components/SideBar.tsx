import { Link, useLocation } from 'wouter';

import {
  Avatar,
  Box,
  Drawer,
  Stack,
  ToggleButton,
  Tooltip,
} from '@mui/material';

import {
  ArticleOutlined,
  CandlestickChartOutlined,
  LeaderboardOutlined,
  LogoutOutlined,
  NotificationsOutlined,
  SettingsOutlined,
  StadiumOutlined,
  StorefrontOutlined,
  TimelineOutlined,
} from '@mui/icons-material';

import logo from './../assets/logo.png';

const SideBar = () => {
  const [location, setLocation] = useLocation();

  return (
    <Drawer variant="permanent" elevation={0}>
      <Box sx={{ overflow: 'auto', height: '100vh', padding: 2 }}>
        <Stack direction="column" alignItems="center" justifyContent="flex-start" spacing={2}>
          <Avatar src={logo} sx={{ bgcolor: 'white', width: 40, height: 40, marginBottom: 3 }} />

          <Link to="/feed">
            <Tooltip title="Feed" placement="right" enterDelay={500} enterNextDelay={500} arrow>
              <ToggleButton value="feed" sx={{ border: 0 }} selected={ location.split('/')[1] === 'feed' }>
                <TimelineOutlined />
              </ToggleButton>
            </Tooltip>
          </Link>

          <Link to="/notifications">
            <Tooltip title="Notifications" placement="right" enterDelay={500} enterNextDelay={500} arrow>
              <ToggleButton value="notifications" sx={{ border: 0 }} selected={ location.split('/')[1] === 'notifications' }>
                <NotificationsOutlined />
              </ToggleButton>
            </Tooltip>
          </Link>

          <Link to="/trade">
            <Tooltip title="Trade" placement="right" enterDelay={500} enterNextDelay={500} arrow>
              <ToggleButton value="trade" sx={{ border: 0 }} selected={ location.split('/')[1] === 'trade' }>
                <CandlestickChartOutlined />
              </ToggleButton>
            </Tooltip>
          </Link>

          <Link to="/arena">
            <Tooltip title="Arena" placement="right" enterDelay={500} enterNextDelay={500} arrow>
              <ToggleButton value="arena" sx={{ border: 0 }} selected={ location.split('/')[1] === 'arena' }>
                <StadiumOutlined />
              </ToggleButton>
            </Tooltip>
          </Link>

          <Link to="/leaderboard">
            <Tooltip title="Leaderboard" placement="right" enterDelay={500} enterNextDelay={500} arrow>
              <ToggleButton value="leaderboard" sx={{ border: 0 }} selected={ location.split('/')[1] === 'leaderboard' }>
                <LeaderboardOutlined />
              </ToggleButton>
            </Tooltip>
          </Link>

          <Link to="/store">
            <Tooltip title="Store" placement="right" enterDelay={500} enterNextDelay={500} arrow>
              <ToggleButton value="store" sx={{ border: 0 }} selected={ location.split('/')[1] === 'store' }>
                <StorefrontOutlined />
              </ToggleButton>
            </Tooltip>
          </Link>

          <Stack direction="column" alignItems="center" sx={{ position: 'absolute', bottom: 16 }}>

            <Link to="/settings">
              <Tooltip title="Settings" placement="right" enterDelay={500} enterNextDelay={500} arrow>
                <ToggleButton value="settings" sx={{ border: 0 }} selected={ location.split('/')[1] === 'settings' }>
                  <SettingsOutlined />
                </ToggleButton>
              </Tooltip>
            </Link>

            <Link to="/docs">
              <Tooltip title="Docs" placement="right" enterDelay={500} enterNextDelay={500} arrow>
                <ToggleButton value="docs" sx={{ border: 0 }} selected={ location.split('/')[1] === 'docs' }>
                  <ArticleOutlined />
                </ToggleButton>
              </Tooltip>
            </Link>

            <Tooltip title="Logout" placement="right" enterDelay={500} enterNextDelay={500} arrow>
              <ToggleButton value="logout" sx={{ border: 0 }}>
                <LogoutOutlined />
              </ToggleButton>
            </Tooltip>
          </Stack>

        </Stack>
      </Box>
    </Drawer>
  );
};

export default SideBar;
