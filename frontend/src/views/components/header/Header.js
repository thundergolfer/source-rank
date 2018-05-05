import './Header.css';
import React from 'react';
import { SvgLogo } from 'views/components/svg';

const Header = () => (
  <div styleName="wrapper">
    <div>
      <SvgLogo styleName="logo" />
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
