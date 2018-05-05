import exampleData from './example/example-data';

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
    /* For now simply return the example data */
    return exampleData;
  }
}

export default new SourceRank();
