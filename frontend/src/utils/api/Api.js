import axios from 'axios';
import config from 'config';

class Api {
  call = ( options = {}) => {
    return axios({
      timeout: 30000,
      responseType: 'json',
      ...options,
      url: `${window.location.origin}/api/${options.url}`,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }

  getMethodologyHeuristics() {
    return this.call({
      method: 'get',
      url: 'methodology/heuristics',
    });
  }
}

export default new Api();
