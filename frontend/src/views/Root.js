import 'normalize.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from 'config/routes';
import App from './app';

const Root = (
  <BrowserRouter>
    <App>
      {renderRoutes( routes )}
    </App>
  </BrowserRouter>
);

export default Root;
