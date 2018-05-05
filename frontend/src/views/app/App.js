import React from 'react';
import { node } from 'prop-types';

const App = ({ children }) => (
  <div>
    {children}
  </div>
);

App.propTypes = {
  children: node,
};

export default App;
