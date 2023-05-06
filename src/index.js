import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { green, purple } from '@mui/material/colors';

const root = createRoot(document.querySelector('#root'));

const theme = createTheme({
  palette: {
    primary: {
      main: green[500]
    },
    secondary: {
      main: purple[500]
    }
  },
  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        margin: 'normal'
      }
    }
  }
});

root.render(
  <Provider store={store}>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </HashRouter>
  </Provider>
);
