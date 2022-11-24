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
        hello world
      </Box>
    </ThemeProvider>
  );
};

export default App;
