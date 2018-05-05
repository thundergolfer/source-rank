import exampleData from './example/example-data';

class SourceRank {
  async getFormattedRanking( url ) {
    /* Get the ranking data for this url */
    const ranking = await this.getRanking( url );
    return `The results are in! We give this site a ${ranking.num_rating} (${ranking.str_rating})`;
  }

  async getRanking( url ) {
    /* For now simply return the example data */
    return exampleData;
  }
}

export default new SourceRank();
