import React, { Component } from 'react';
import Layout from 'views/layout';
import { Link } from 'views/components';

class Home extends Component {
  render() {
    return (
      <Layout
        backgroundWaves
        container
        header
      >
        <h1>Home</h1>

        <Link to="/about">
          <p>About</p>
        </Link>
      </Layout>
    );
  }
}

export default Home;
