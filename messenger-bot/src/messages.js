/* Include dependencies */
import logger from './logger';
import FB from './fb';

class Messages {
  processMessage( data ) {
    /* Get all of the key info */
    const { sender, timestamp, message } = data;

    /* Log the received message */
    logger.info( `Message from ${sender.id} - ${message.text}` );

    /* Test sending a message back */
    FB.sendMessage( sender.id, 'Thanks for trying out the bot!' );
  }
}

export default new Messages();
