/* Include dependencies */
import logger from './logger';
import FB from './fb';
import getURLs from 'get-urls';
import SourceRank from './source-rank';

/* Define a list of messages that trigger an introduction */
const INTRODUCTION_TRIGGER_PHRASES = [ 'hey', 'hi', 'help', 'how', '?' ];

class Messages {
  async processMessage( data ) {
    /* Get all of the key info */
    const { sender, message } = data;

    /* Log the received message */
    logger.info( `Message from ${sender.id} - ${message.text}` );

    /* Get the message text content */
    let { text } = message;

    /* Trim the message */
    text = text.trim();

    /* Try and parse any URLs in the string */
    const urls = getURLs( text );

    /* If we've got some URLs tell the user that we are processing them */
    if ( urls.size ) {
      await FB.sendMessage( sender.id, `Hold tight! We are ranking ${urls.length > 1 ? 'all the links you sent us now' : 'the link'} now, we'll be back in a sec.` );

      /* Loop through all the links sent and send back the ranking */
      urls.forEach( async url => {
        /* Get the ranking for this site */
        const rating = await SourceRank.getDetailedRating( url );

        /* Send back the ranking */
        FB.sendDetailedMessage( sender.id, rating.rating, rating.text );
      });
      return;
    }

    /* We couldn't find any URLs, check for whether the text contains any of the introduction trigger phrases */
    for ( let i = 0; i < INTRODUCTION_TRIGGER_PHRASES.length; i++ ) {
      if ( text.toLowerCase().includes( INTRODUCTION_TRIGGER_PHRASES[i] )) {
        /* Send back the introduction */
        FB.sendMessage( sender.id, 'Hey there! I\'m SourceRank!\nI\'m pretty simple to use. Just send me a link and I\'ll give it a ranking. Easy as right?' );
        return;
      }
    }

    /* Message isn't a URL. Send back a message containing some instructions */
    FB.sendMessage( sender.id, 'Hmm... that doesn\'t look like a link. To use SourceRank simply send us a URL and we\'ll rank it for you!' );
  }
}

export default new Messages();
