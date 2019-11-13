import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import globalStyle from './themes/globalStyle';
import * as serviceWorker from './serviceWorker';
import Router from './Router';

let REACT_APP_API_URI = process.env.REACT_APP_LOCAL_API_URI;
if (process.env.REACT_APP_ENVIRONMENT === 'development') {
  REACT_APP_API_URI = process.env.REACT_APP_DEV_API_URI;
} else if (process.env.REACT_APP_ENVIRONMENT === 'production') {
  REACT_APP_API_URI = process.env.REACT_APP_API_URI;
}
const client = new ApolloClient({ uri: REACT_APP_API_URI });

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={globalStyle}>
      <Router />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
