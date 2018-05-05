import axios from 'axios';
import config from 'config';

class Api {
  call = ( options = {}) => {
    return axios({
      timeout: 30000,
      responseType: 'json',
      ...options,
      url: `${config.api.baseUrl}/${options.url}`,
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

  getPublications() {
    return this.call({
      method: 'get',
      url: 'publications',
    });
  }

  getPublicationRankings( heuristicId ) {
    return this.call({
      method: 'get',
      url: `publications/rank?heuristic=${heuristicId}`,
    });
  }
}

export default new Api();
