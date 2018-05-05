import './Container.css';
import React from 'react';
import { node } from 'prop-types';

const Container = ({ children, ...restProps }) => (
  <div styleName="wrapper" {...restProps}>
    {children}
  </div>
);

Container.propTypes = {
  children: node,
};

export default Container;
