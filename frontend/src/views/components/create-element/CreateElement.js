import { createElement } from 'react';
import { string, node } from 'prop-types';

const CreateElement = ({
  element,
  children,
  ...restProps
}) => {
  return createElement(
    element,
    restProps,
    children,
  );
};

CreateElement.propTypes = {
  element: string.isRequired,
  children: node,
};

export default CreateElement;
