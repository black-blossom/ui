import {
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
    </ThemeProvider>
  );
};

export default App;
