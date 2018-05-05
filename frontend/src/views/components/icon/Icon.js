import './Icon.css';
import React from 'react';
import { string, oneOf } from 'prop-types';
import cx from 'classnames';

const Icon = ({
  name,
  color,
  ...restProps
}) => {
  return (
    <i
      {...restProps}
      className="material-icons"
      styleName={cx(
        'icon',
        color,
      )}
    >
      {name}
    </i>
  );
};

Icon.propTypes = {
  name: string,
  color: oneOf(
    ['white', 'black']
  ),
};

export default Icon;
