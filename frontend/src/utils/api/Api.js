import axios from 'axios';
import config from 'config';

class Api {
  call = ( options = {}) => {
    return axios({
      timeout: 30000,
      responseType: 'json',
      ...options,
      url: `${config.api.baseUrl}${options.url}`,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }

  getMethodologyHeuristics() {
    return this.call({
      url: '/methodology/heuristics',
    });
  }
}

export default Api;
