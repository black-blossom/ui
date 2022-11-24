import { useMemo } from 'react';

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
import SideBarItem from './SideBarItem';

const SideBar = () => {
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
      {
        name: 'Logout',
        icon: <LogoutOutlined />,
        link: '/logout',
        match: ''
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
                <SideBarItem
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  link={item.link}
                  match={item.match}
                />
              )
            })
          }

          <Stack direction="column" alignItems="center" sx={{ position: 'absolute', bottom: 16 }}>
            {
              bottomItems.map((item, index: number) => {
                return (
                  <SideBarItem
                    key={index}
                    name={item.name}
                    icon={item.icon}
                    link={item.link}
                    match={item.match}
                  />
                )
              })
            }
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default SideBar;
