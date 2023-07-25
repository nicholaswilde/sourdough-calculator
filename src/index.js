import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
  <StyledEngineProvider injectFirst>
    <App />
    </StyledEngineProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
