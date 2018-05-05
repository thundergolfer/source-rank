import './Button.css';
import React from 'react';
import { oneOf, node, oneOfType, number, string } from 'prop-types';
import cx from 'classnames';

const Button = ({
  children,
  color,
  width,
  ...restProps
}) => {
  const style = {
    width,
  };

  return (
    <button
      {...restProps}
      style={style}
      styleName={cx(
        'button',
        color,
      )}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: node,
  color: oneOf(
    ['white', 'black']
  ).isRequired,
  width: oneOfType(
    [number, string]
  ),
};

export default Button;
