import React, { Component } from 'react';
import Layout from 'views/layout';
import { Link, Heading } from 'views/components';

class Home extends Component {
  render() {
    return (
      <Layout
        backgroundWaves
        container
        header
      >
        <Heading
          size="lg"
          color="white"
        >
          Choose a news quality signal
        </Heading>

        <Link to="/about">
          <p>About</p>
        </Link>
      </Layout>
    );
  }
}

export default Home;
