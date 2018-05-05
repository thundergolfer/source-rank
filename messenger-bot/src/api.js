/* Include dependencies */
import config from './config';
import express from 'express';
import logger from './logger';

class API {
  constructor() {
    /* Create the app */
    this.app = express();

    /* Setup the routes */
    this.setupRoutes();
  }

  setupRoutes() {
    /* Setup health check route */
    this.app.get( '/', ( req, res ) => {
      /* Send back basic information about the app */
      res.json({
        appName: config.appName,
      });
    });

    /* Set up webook verification route */
    this.app.get( '/webhook', ( req, res ) => {
      /* Check whether a verfiy token was provided */
      if ( req.query.hub && req.query.hub.verify_token ) {
        if ( req.query.hub.verify_token === config.messenger.verifyToken ) {
          /* Token provided was correct */
          res.send( req.query.hub.challenge );
          return;
        }
      }

      /* Token wasn't correct or wasn't provided, send back an error */
      res.status( 403 );
      res.json({ error: 'The token wasn\'t provided or was incorrect' });
    });
  }

  start() {
    /* Start the app */
    this.app.listen( config.api.port, () => {
      logger.info( `${config.appName} is listening on port ${config.api.port}` );
    });
  }
}

export default new API();
