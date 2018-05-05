import React from 'react';
import { bool } from 'prop-types';
import { SvgLogo } from '../svg';

const Logo = ({
  round,
  ...restProps
}) => {
  if ( round ) {
    return (
      <SvgLogo
        {...restProps}
        style={{
          padding: 5,
          background: '#FFF',
          boxShadow: '0px 4px 20px 1px rgba(0, 0, 0, 0.5)',
          borderRadius: '50%',
          ...restProps.style,
        }}
      />
    );
  }

  return <SvgLogo {...restProps} />;
};

Logo.propTypes = {
  round: bool,
};

export default Logo;
