import React from 'react';
import { node } from 'prop-types';

const App = ({ children }) => (
  <div>
    <h1>App</h1>

    {children}
  </div>
);

App.propTypes = {
  children: node,
};

export default App;
