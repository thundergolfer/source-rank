import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { string, node } from 'prop-types';

const Link = ({ to, children, ...restProps }) => (
  <ReactRouterLink
    {...restProps}
    to={to}
  >
    {children}
  </ReactRouterLink>
);

Link.propTypes = {
  to: string.isRequired,
  children: node,
};

export default Link;
