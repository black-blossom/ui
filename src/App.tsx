import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import darkTheme from './themes/darkTheme';

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <div className="App">
        hello world
      </div>
    </ThemeProvider>
  );
};

export default App;
