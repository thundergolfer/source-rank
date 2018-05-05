/* Include dependencies */
import config from './config';
import axios from 'axios';

class Facebook {
  /* Sends a message to the user with the specified ID */
  sendMessage( user, message ) {
    axios({
      url: `https://graph.facebook.com/v2.6/me/messages?access_token=${config.fb.accessToken}`,
      method: 'post',
      data: {
        recipient: { id: user },
        message: { text: message },
      },
    }).then( success => {
      console.log( success );
    }).catch( error => {
      console.log( error );
    });
  }
}

export default new Facebook();
