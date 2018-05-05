import './Heading.css';
import React from 'react';
import { bool, string, oneOf } from 'prop-types';
import cx from 'classnames';
import { CreateElement } from '../index';

const sizes = {
  xs: {
    element: 'h5',
    fontSize: 14,
  },
  sm: {
    element: 'h4',
    fontSize: 18,
  },
  md: {
    element: 'h3',
    fontSize: 24,
  },
  lg: {
    element: 'h2',
    fontSize: 32,
  },
  xl: {
    element: 'h2',
    fontSize: 48,
  },
};

const Heading = ({
  size = 'lg',
  pageHeading = false,
  color = 'white',
  children,
  ...restProps
}) => {
  const element = pageHeading
    ? 'h1'
    : sizes[size].element;

  return (
    <CreateElement
      {...restProps}
      element={element}
      styleName={cx(
        'element',
        color,
      )}
    >
      <span styleName="underline">
        {children}
      </span>
    </CreateElement>
  );
};

Heading.propTypes = {
  pageHeading: bool,
  size: oneOf(
    ['xs', 'sm', 'md', 'lg']
  ),
  children: string,
  color: oneOf(
    ['white', 'black']
  ),
};

export default Heading;
