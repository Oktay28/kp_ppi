import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import client from './client';
import { ApolloProvider } from '@apollo/client';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider, unstable_createMuiStrictModeTheme} from '@material-ui/core';

import 'react-toastify/dist/ReactToastify.css';
import './css/stylesheet.min.css';
import GlobalStyles from './GlobalStyles';
import {GlobalProvider} from './components/context/GlobalContext';

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    primary: {
      main: "#537072",
      dark: "#2C4A52",
      light: "#839B97",
      contrastText: "#F4EBDB"
    }
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
      }
    },
    MuiDialog: {
      paper: {
        "@media all and (max-width: 600px)": {
          margin: "100px 10px 50px",
          maxHeight: "calc( 100% - 120px ) !important"
        }
      }
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <GlobalProvider>
      <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <GlobalStyles />
        </ThemeProvider>
      </GlobalProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
