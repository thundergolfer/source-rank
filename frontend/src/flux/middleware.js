import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const developmentMiddleware = [
  thunk,
  logger,
];

const productionMiddleware = [
  thunk,
];

export default applyMiddleware(
  ...( process.env.NODE_ENV === 'production' )
    ? productionMiddleware
    : developmentMiddleware
);
