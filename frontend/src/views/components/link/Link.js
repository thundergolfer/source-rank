import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { string, node, bool } from 'prop-types';
import './link.css';

const Link = ({ to, children, external, ...restProps }) => {
  if ( external ) {
    return (
      <a {...restProps} href={to} styleName='link'>
        {children}
      </a>
    )
  }

  return (
    <ReactRouterLink styleName='link'
      {...restProps}
      to={to}
    >
      {children}
    </ReactRouterLink>
  );
}

Link.propTypes = {
  to: string.isRequired,
  children: node,
  external: bool,
};

export default Link;
