/* Include dependencies */
import logger from './logger';
import FB from './fb';
import getURLs from 'get-urls';
import SourceRank from './source-rank';

/* Define a list of messages that trigger an introduction */
const INTRODUCTION_TRIGGER_PHRASES = [ 'hey', 'hi', 'help', 'how', '?' ];

class Messages {
  async processFBMessage( data ) {
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

        if ( !rating ) {
          FB.sendMessage( sender.id, 'Sorry! We can\'t process that link as it doesn\'t look like it\'s an article. We\'ll try harder next time!' );
          return;
        }

        /* Send back the ranking */
        FB.sendDetailedMessage( sender.id, rating.rating, rating.text );
      });
      return;
    }

    /* We couldn't find any URLs, check for whether the text contains any of the introduction trigger phrases */
    if ( this.isIntroduction( text )) {
      /* Send back the introduction */
      FB.sendMessage( sender.id, 'Hey there! I\'m SourceRank!\nI\'m pretty simple to use. Just send me a link and I\'ll give it a ranking. Easy as right?' );
      return;
    }

    /* Message isn't a URL. Send back a message containing some instructions */
    FB.sendMessage( sender.id, 'Hmm... that doesn\'t look like a link. To use SourceRank simply send us a URL and we\'ll rank it for you!' );
  }

  async processTwilioMessage( data ) {
    /**
    * Get the response data
    * Body | The SMS body data (longer messages should be combined)
    * From | The number of the person who sent the message (in E164 format)
    * To | The number this SMS was received on
    */
    const { Body, From } = data;

    /* Log the received message */
    logger.info( `Message from ${From} - ${Body}` );

    /* Trim the input */
    const text = Body.trim();

    /* Try and parse any URLs in the string */
    const urls = getURLs( text );

    /* If we've got some URLs tell the user that we are processing them */
    if ( urls.size ) {
      /* Get the ranking for this site */
      const rating = await SourceRank.getFormattedRating( urls[0] );

      if ( !rating ) {
        return 'Hmm... that doesn\'t look like a link. To use SourceRank simply send us a URL and we\'ll rank it for you!';
      }

      /* Send back the ranking */
      return rating;
    }

    /* We couldn't find any URLs, check for whether the text contains any of the introduction trigger phrases */
    if ( this.isIntroduction( text )) {
      /* Send back the introduction */
      return 'Hey there! I\'m SourceRank!\nI\'m pretty simple to use. Just send me a link and I\'ll give it a ranking. Easy as right?';
    }

    return 'Hmm... that doesn\'t look like a link. To use SourceRank simply send us a URL and we\'ll rank it for you!';
  }

  isIntroduction( text ) {
    for ( let i = 0; i < INTRODUCTION_TRIGGER_PHRASES.length; i++ ) {
      if ( text.toLowerCase().includes( INTRODUCTION_TRIGGER_PHRASES[i] )) {
        return true;
      }
    }

    return false;
  }
}

export default new Messages();
