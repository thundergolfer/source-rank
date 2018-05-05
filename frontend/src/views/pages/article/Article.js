import './article.css';
import React, { Component } from 'react';
import Layout from 'views/layout';
import { Heading, Box, Spinner } from 'views/components';
import axios from 'axios';

class Article extends Component {
  state = {
    value: '',
    loading: false,
    data: null,
    url: '',
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleKeyPress = e => {
    if ( e.key === 'Enter' ) {
      this.check( e.target.value );
      this.setState({ value: '' });
    }
  };

  check = url => {
    this.setState({ loading: true, error: false, data: null, url });

    /* Check the URL */
    axios.post( 'http://www.sourcerank.org/api/article', { url }).then( data => {
      console.log( data );
      this.setState({ data: data.data, loading: false });
    }).catch(() => {
      this.setState({ error: true, loading: false });
    });
  }

  getRatingColor( ratingValue ) {
    let color = '#2ecc71'; /* Green */

    if ( ratingValue < 8 ) {
      color = '#f39c12'; /* Orange */
    }

    if ( ratingValue < 5 ) {
      color = '#e74c3c'; /* Red */
    }

    return color;
  }

  render() {
    const { loading, data, error, url } = this.state;
    /* Calculate a colour for the rating */
    const ratingValue = data && data.num_rating;
    let color = '#2ecc71'; /* Green */

    if ( ratingValue < 8 ) {
      color = '#f39c12'; /* Orange */
    }

    if ( ratingValue < 5 ) {
      color = '#e74c3c'; /* Red */
    }

    return (
      <Layout
        backgroundWaves
        container
        header
      >
        <Box
          display="flex"
          marginTop={50}
          marginX={100}
        >
          <Box
            flexGrow={1}
            flexBasis={0}
            marginTop={20}
            marginRight={50}
            marginBottom={100}
          >
            <Box marginBottom={40}>
              <Heading
                size="lg"
                color="white"
              >
                Check an article
              </Heading>
              <br />
              <p style={{ color: '#FFF' }}>
                Simply enter the URL of the article you wish to check on the right!
              </p>
            </Box>
          </Box>

          <Box
            flexGrow={1}
            flexBasis={0}
            display='flex'
            alignItems='center'
          >
            <input styleName="article-input" type="text" placeholder="URL" onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.state.value} />
          </Box>
        </Box>
        <Box marginTop={200} textAlign="center">
          { loading && <Spinner /> }
          { data && (
            <div styleName="dataResult">
              <div styleName="articleImage" style={{ backgroundImage: `url("https://sourcerank-fb-messenger-bot.now.sh/og?url=${url}")` }} />
              <h2 style={{ color }}>{data.num_rating}</h2>
              <small>We've ranked this article as...</small>
              <p style={{ color }}>{data.str_rating}</p>
              <div styleName="scoresData">
                <div>
                  <div>
                    <b>Level of neutrality</b>
                    <h3 style={{ color: this.getRatingColor( data.heuristics['avoid_highly_biased'] ) }}>{data.heuristics.avoid_highly_biased}</h3>
                  </div>
                  <div>
                    <b>Has subscription revenue</b>
                    <h3 style={{ color: this.getRatingColor( data.heuristics['has-subscription-revenue'] ) }}>{data.heuristics['has-subscription-revenue']}</h3>
                  </div>
                </div>
                <div>
                  <div>
                    <b>Is pro-science</b>
                    <h3 style={{ color: this.getRatingColor( data.heuristics['is-pro-science'] ) }}>{data.heuristics['is-pro-science']}</h3>
                  </div>
                  <div>
                    <b>Uses expert sources</b>
                    <h3 style={{ color: this.getRatingColor( data.heuristics['trust-the-experts'] ) }}>{data.heuristics['trust-the-experts']}</h3>
                  </div>
                </div>
              </div>
              <small>{url}</small>
              <br /><br />
            </div>
          )}
          { error && (
            <div styleName="resultError">
              Sorry! We can't process that link as it doesn't look like it's an article. We'll try harder next time!
            </div>
          )}
        </Box>

        <Box
          marginBottom={200}
        />
      </Layout>
    );
  }
}
export default Article;
