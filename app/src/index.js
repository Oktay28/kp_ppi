import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import client from './client';
import { ApolloProvider } from '@apollo/client';
import {BrowserRouter} from 'react-router-dom';
import './css/stylesheet.min.css';
import {ThemeProvider, unstable_createMuiStrictModeTheme} from '@material-ui/core';
const theme = unstable_createMuiStrictModeTheme({
  palette: {
    primary: {
      main: "#537072",
      dark: "#2C4A52",
      light: "#839B97",
      contrastText: "#F4EBDB"
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
