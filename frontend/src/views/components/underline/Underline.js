import './Underline.css';
import React from 'react';
import { oneOf, node } from 'prop-types';
import cx from 'classnames';

const Underline = ({ children, color, ...restProps }) => {
  return (
    <span
      {...restProps}
      styleName={cx(
        'underline',
        color,
      )}
    >
      {children}
    </span>
  );
};

Underline.propTypes = {
  children: node,
  color: oneOf(
    ['white', 'black', 'purple']
  ),
};

export default Underline;
