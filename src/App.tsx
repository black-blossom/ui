import { Redirect, Route, Switch } from 'wouter';

import {
  Box,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';

import darkTheme from './themes/darkTheme';
import SideBar from './components/SideBar';
import TradePage from './pages/TradePage'
import TopBar from './components/TopBar';

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <TopBar />
      <SideBar />
      <Box sx={{ paddingTop: 4, paddingLeft: 14, paddingRight: 4, paddingBottom: 4 }}>
        <Switch>
          <Route path="/">
            <Redirect to="/feed" />
          </Route>

          <Route path="/feed">
            feed
          </Route>

          <Route path="/notifications">
            notifications
          </Route>

          <Route path="/trade">
            <TradePage />
          </Route>

          <Route path="/arena">
            arena
          </Route>

          <Route path="/leaderboard">
            leaderboard
          </Route>

          <Route path="/store">
            store
          </Route>

          <Route path="/settings">
            settings
          </Route>

          <Route path="/docs">
            docs
          </Route>

          <Route path="/profile/:username">
            {
              params => {
                return (
                  <>{params.username}</>
                );
              }
            }
          </Route>

          <Route path="/logout">
            handle logging out user and redirecting to proper page
          </Route>

          <Route>
            404 error
          </Route>
        </Switch>
      </Box>
    </ThemeProvider>
  );
};

export default App;
