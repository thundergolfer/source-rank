import React, { Component } from 'react';
import { Link } from 'views/components';

class About extends Component {
  render() {
    return (
      <div>
        <h1>About</h1>

        <Link to="/">
          <p>Home</p>
        </Link>
      </div>
    );
  }
}

export default About;
