import axios from 'axios';

class SourceRank {
  async getFormattedRating( url ) {
    /* Get the rating data for this url */
    const rating = await this.getRating( url );
    return `The results are in! We give this site a ${rating.num_rating} (${rating.str_rating})`;
  }

  async getDetailedRating( url ) {
    /* Get the rating data for this url */
    const rating = await this.getRating( url );
    return { text: `The results are in! We give this site a ${rating.num_rating} (${rating.str_rating})`, rating: rating.num_rating };
  }

  async getRating( url ) {
    let result = null;
    try {
      const response = await axios.post( 'http://www.sourcerank.org/api/article', { url });
      result = response.data;
    } catch ( e ) { /* Do nothing */ }

    return result;
  }
}

export default new SourceRank();
