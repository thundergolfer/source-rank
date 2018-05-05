import 'normalize.css';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from 'config/routes';
import store from 'flux/store';
import App from './app';

const Root = (
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App>
        {renderRoutes( routes )}
      </App>
    </BrowserRouter>
  </ReduxProvider>
);

export default Root;
