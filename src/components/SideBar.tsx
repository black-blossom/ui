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
  PeopleOutlined,
  PersonOutlined,
  SettingsOutlined,
  StadiumOutlined,
  TimelineOutlined,
} from '@mui/icons-material';

import logo from './../assets/logo.png';

const SideBar = () => {

  return (
    <Drawer variant="permanent">
      <Box sx={{ overflow: 'auto', height: '100vh', padding: 2 }}>
        <Stack direction="column" alignItems="center" justifyContent="flex-start" spacing={2}>
          <Avatar src={logo} sx={{ bgcolor: 'white', width: 40, height: 40, marginBottom: 3 }} />

          <Tooltip title="Feed" placement="right" enterDelay={500} enterNextDelay={500} arrow>
            <ToggleButton value="feed" sx={{ border: 0 }} selected>
              <TimelineOutlined />
            </ToggleButton>
          </Tooltip>

          <Tooltip title="Notifications" placement="right" enterDelay={500} enterNextDelay={500} arrow>
            <ToggleButton value="notifications" sx={{ border: 0 }} >
              <NotificationsOutlined />
            </ToggleButton>
          </Tooltip>

          <Tooltip title="Trade" placement="right" enterDelay={500} enterNextDelay={500} arrow>
            <ToggleButton value="trade" sx={{ border: 0 }} >
              <CandlestickChartOutlined />
            </ToggleButton>
          </Tooltip>

          <Tooltip title="Arena" placement="right" enterDelay={500} enterNextDelay={500} arrow>
            <ToggleButton value="arena" sx={{ border: 0 }} >
              <StadiumOutlined />
            </ToggleButton>
          </Tooltip>

          <Tooltip title="Leaderboard" placement="right" enterDelay={500} enterNextDelay={500} arrow>
            <ToggleButton value="leaderboard" sx={{ border: 0 }} >
              <LeaderboardOutlined />
            </ToggleButton>
          </Tooltip>

          <Tooltip title="Friends" placement="right" enterDelay={500} enterNextDelay={500} arrow>
            <ToggleButton value="friends" sx={{ border: 0 }} >
              <PeopleOutlined />
            </ToggleButton>
          </Tooltip>

          <Stack direction="column" alignItems="center" sx={{ position: 'absolute', bottom: 16 }}>
            <Tooltip title="Profile" placement="right" enterDelay={500} enterNextDelay={500} arrow>
              <ToggleButton value="profile" sx={{ border: 0 }} >
                <PersonOutlined />
              </ToggleButton>
            </Tooltip>

            <Tooltip title="Settings" placement="right" enterDelay={500} enterNextDelay={500} arrow>
              <ToggleButton value="settings" sx={{ border: 0 }} >
                <SettingsOutlined />
              </ToggleButton>
            </Tooltip>

            <Tooltip title="Docs" placement="right" enterDelay={500} enterNextDelay={500} arrow>
              <ToggleButton value="docs" sx={{ border: 0 }} >
                <ArticleOutlined />
              </ToggleButton>
            </Tooltip>

            <Tooltip title="Logout" placement="right" enterDelay={500} enterNextDelay={500} arrow>
              <ToggleButton value="logout" sx={{ border: 0 }} >
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
