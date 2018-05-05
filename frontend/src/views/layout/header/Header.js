import './Header.css';
import React from 'react';
import { Logo } from 'views/components';

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
          <li>Source Code</li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Header;
