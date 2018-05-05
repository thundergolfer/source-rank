/* Include dependencies */
import config from './config';
import express from 'express';
import bodyParser from 'body-parser';
import logger from './logger';
import Messages from './messages';
import text2png from 'text2png';

class API {
  constructor() {
    /* Create the app */
    this.app = express();

    /* Setup body parsers */
    this.app.use( bodyParser.json());

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
      if ( req.query['hub.verify_token'] ) {
        if ( req.query['hub.verify_token'] === config.messenger.verifyToken ) {
          /* Token provided was correct */
          res.send( req.query['hub.challenge'] );
          return;
        }
      }

      /* Token wasn't correct or wasn't provided, send back an error */
      res.status( 403 );
      res.json({ error: 'The token wasn\'t provided or was incorrect' });
    });

    /* Setup the route to receive messages */
    this.app.post( '/webhook', ( req, res ) => {
      /* Get all of the entries provided */
      const { entry } = req.body;

      /* Loop through each entry */
      entry.forEach( entry => {
        /* Loop through each message received */
        if ( entry.messaging ) {
          entry.messaging.forEach( message => {
            /* Process the message */
            Messages.processMessage( message );
          });
        }
      });

      /* Send back a successful response */
      res.json({ success: true });
    });

    /* Setup a route to return an image with a ranking */
    this.app.get( '/images/ranking/:ranking', ( req, res ) => {
      /* Get the ranking provided */
      const { ranking } = req.params;

      /* Render the ranking to an image */
      res.type( 'image/png' );
      res.send( text2png( ranking, {
        font: '200px Futura',
        textColor: 'teal',
        paddingLeft: 200,
        paddingRight: 200,
        paddingTop: 100,
        paddingBottom: 100,
        backgroundColor: 'white',
      }));
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
