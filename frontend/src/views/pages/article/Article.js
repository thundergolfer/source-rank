import React, { Component } from 'react';
import Layout from 'views/layout';
import { Heading, Box } from 'views/components';

class Article extends Component {
  render() {
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
            <input type="text" placeholder="URL" />
          </Box>
        </Box>
      </Layout>
    );
  }
}
export default Article;
