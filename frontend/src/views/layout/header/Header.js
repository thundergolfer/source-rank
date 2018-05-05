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
          <li><Link to='/article'>Check an article</Link></li>
          <li><Link to='https://www.messenger.com/t/166585247361466' external>FB Messenger</Link></li>
          <li>Methodology</li>
          <li><Link to='https://github.com/thundergolfer/source-rank' external>See The Code</Link></li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Header;
