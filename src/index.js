import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

const theme = createTheme();
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </ThemeProvider>
  </React.StrictMode>
);

serviceWorker.unregister();
