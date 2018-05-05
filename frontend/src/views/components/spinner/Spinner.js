import React, { Component } from 'react';
import './spinner.css';

class Spinner extends Component {
  render() {
    return (
      <div styleName="spinner">
        <div styleName="bounce1" />
        <div styleName="bounce2" />
        <div />
      </div>
    );
  }
}

export default Spinner;
