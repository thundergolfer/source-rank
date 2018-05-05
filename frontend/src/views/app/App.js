import React from 'react';
import { node } from 'prop-types';
import { Header } from 'views/components';

const App = ({ children }) => (
  <div>
    <Header />

    {children}
  </div>
);

App.propTypes = {
  children: node,
};

export default App;
