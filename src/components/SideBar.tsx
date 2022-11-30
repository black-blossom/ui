import { useMemo } from 'react';

import {
  Avatar,
  Box,
  Drawer,
  Stack,
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
import useAuthStore from './../hooks/useAuth';

const SideBar = () => {
  const user = useAuthStore(state => state.data);

  const topItems = useMemo(() => {
    return [
      {
        name: 'Feed',
        icon: <TimelineOutlined />,
        link: '/feed',
        match: 'feed',
        authRequired: true,
      },
      {
        name: 'Notifications',
        icon: <NotificationsOutlined />,
        link: '/notifications',
        match: 'notifications',
        authRequired: true,
      },
      {
        name: 'Trade',
        icon: <CandlestickChartOutlined />,
        link: '/trade',
        match: 'trade',
        authRequired: false,
      },
      {
        name: 'Arena',
        icon: <StadiumOutlined />,
        link: '/arena',
        match: 'arena',
        authRequired: false,
      },
      {
        name: 'Leaderboard',
        icon: <LeaderboardOutlined />,
        link: '/leaderboard',
        match: 'leaderboard',
        authRequired: false,
      },
      {
        name: 'Store',
        icon: <StorefrontOutlined />,
        link: '/store',
        match: 'store',
        authRequired: false,
      },
    ];
  }, []);

  const bottomItems = useMemo(() => {
    return [
      {
        name: 'Settings',
        icon: <SettingsOutlined />,
        link: '/settings',
        match: 'settings',
        authRequired: true,
      },
      {
        name: 'Docs',
        icon: <ArticleOutlined />,
        link: '/docs',
        match: 'docs',
        authRequired: false,
      },
      {
        name: 'Logout',
        icon: <LogoutOutlined />,
        link: '/logout',
        match: '',
        authRequired: true,
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
              if(item.authRequired && !user.auth) return;

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
                if(item.authRequired && !user.auth) return;

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
