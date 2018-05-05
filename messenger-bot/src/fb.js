/* Include dependencies */
import config from './config';
import axios from 'axios';
import logger from './logger';

class Facebook {
  /* Sends a message to the user with the specified ID */
  sendMessage( user, message ) {
    return new Promise( resolve => {
      axios({
        url: `https://graph.facebook.com/v2.6/me/messages?access_token=${config.fb.accessToken}`,
        method: 'post',
        data: {
          recipient: { id: user },
          message: { text: message },
        },
      }).then(() => {
        logger.info( `Sent message '${message}' to ${user} successfully` );
        resolve();
      }).catch( error => {
        logger.error( error );
        throw new Error( error );
      });
    });
  }

  sendDetailedMessage( user, rating, message ) {
    return new Promise( resolve => {
      axios({
        url: `https://graph.facebook.com/v2.6/me/messages?access_token=${config.fb.accessToken}`,
        method: 'post',
        data: {
          recipient: { id: user },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'generic',
                elements: [{
                  title: 'Rating',
                  subtitle: message,
                  image_url: `https://sourcerank-fb-messenger-bot.now.sh/images/ranking/${rating}?t=${new Date().getTime()}`,
                  buttons: [
                    {
                      type:'web_url',
                      url:'https://sourcerank.org',
                      title: 'More information'
                    }
                  ],
                }]
              }
            }
          },
        },
      }).then(() => {
        logger.info( `Sent message '${message}' to ${user} successfully` );
        resolve();
      }).catch( error => {
        console.log( error );
        throw new Error( error );
      });
    });
  }
}

export default new Facebook();
