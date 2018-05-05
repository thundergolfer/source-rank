import './Header.css';
import React from 'react';
import { Logo, Link } from 'views/components';

const Header = () => (
  <div styleName="wrapper">
    <div>
      <Logo styleName="logo" round />
    </div>

    <div>
      <nav>
        <ul styleName="list">
          <li>Check an article</li>
          <li>FB Messenger</li>
          <li>Methodology</li>
          <li><Link to='https://github.com/thundergolfer/source-rank' external>See The Code</Link></li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Header;
