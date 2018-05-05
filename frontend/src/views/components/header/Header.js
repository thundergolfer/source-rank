import './Header.css';
import React from 'react';
import { SvgLogo } from 'views/components/svg';

const Header = () => (
  <div styleName="wrapper">
    <div>
      <SvgLogo
        style={{
          height: 90,
          position: 'relative',
          top: 15,
        }}
      />
    </div>

    <div>
      <nav>
        <ul
          style={{

          }}
        >
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
