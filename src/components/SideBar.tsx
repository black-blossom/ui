import { useMemo } from 'react';
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

  const topItems = useMemo(() => {
    return [
      {
        name: 'Feed',
        icon: <TimelineOutlined />,
        link: '/feed',
        match: 'feed'
      },
      {
        name: 'Notifications',
        icon: <NotificationsOutlined />,
        link: '/notifications',
        match: 'notifications'
      },
      {
        name: 'Trade',
        icon: <CandlestickChartOutlined />,
        link: '/trade',
        match: 'trade'
      },
      {
        name: 'Arena',
        icon: <StadiumOutlined />,
        link: '/arean',
        match: 'arean'
      },
      {
        name: 'Leaderboard',
        icon: <LeaderboardOutlined />,
        link: '/leaderboard',
        match: 'leaderboard'
      },
      {
        name: 'Store',
        icon: <StorefrontOutlined />,
        link: '/store',
        match: 'store'
      },
    ];
  }, []);

  const bottomItems = useMemo(() => {
    return [
      {
        name: 'Settings',
        icon: <SettingsOutlined />,
        link: '/settings',
        match: 'settings'
      },
      {
        name: 'Docs',
        icon: <ArticleOutlined />,
        link: '/docs',
        match: 'docs'
      },
    ];
  }, []);

  return (
    <Drawer variant="permanent" elevation={0}>
      <Box sx={{ overflow: 'auto', height: '100vh', padding: 2 }}>
        <Stack direction="column" alignItems="center" justifyContent="flex-start" spacing={2}>
          <Avatar src={logo} sx={{ bgcolor: 'white', width: 40, height: 40, marginBottom: 3 }} />
          {
            topItems.map((item, index: number) => {
              return (
                <Link key={index} to={item.link}>
                  <Tooltip title={item.name} placement="right" enterDelay={500} enterNextDelay={500} arrow>
                    <ToggleButton value={item.name} sx={{ border: 0 }} selected={ location.split('/')[1] === item.match }>
                      {item.icon}
                    </ToggleButton>
                  </Tooltip>
                </Link>
              )
            })
          }

          <Stack direction="column" alignItems="center" sx={{ position: 'absolute', bottom: 16 }}>
            {
              bottomItems.map((item, index: number) => {
                return (
                  <Link key={index} to={item.link}>
                    <Tooltip title={item.name} placement="right" enterDelay={500} enterNextDelay={500} arrow>
                      <ToggleButton value={item.name} sx={{ border: 0 }} selected={ location.split('/')[1] === item.match }>
                        {item.icon}
                      </ToggleButton>
                    </Tooltip>
                  </Link>
                )
              })
            }

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
