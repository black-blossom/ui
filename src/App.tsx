import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';

import darkTheme from './themes/darkTheme';
import TopBar from './components/TopBar';

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <TopBar />
    </ThemeProvider>
  );
};

export default App;
