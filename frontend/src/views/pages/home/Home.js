import React, { Component } from 'react';
import { Link } from 'views/components';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>

        <Link to="/about">
          <p>About</p>
        </Link>
      </div>
    );
  }
}

export default Home;
