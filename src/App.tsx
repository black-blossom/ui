import { Redirect, Route, Switch } from 'wouter';

import {
  Box,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';

import darkTheme from './themes/darkTheme';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';

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
            trade
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

          <Route>
            404 error
          </Route>
        </Switch>
      </Box>
    </ThemeProvider>
  );
};

export default App;
