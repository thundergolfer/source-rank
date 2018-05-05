import React, { Component } from 'react';
import { string, oneOf, number, oneOfType, node, bool } from 'prop-types';
import Downshift from 'downshift';

class Dropdown extends Component {
  state = {
    selectedId: 0,
    isOpen: false,
  }

  handleSelect = id => () => {
    this.setState({ selectedId: id });
  }

  handleToggle = () => {
    this.setState( state => ({ isOpen: !state.isOpen }));
  }

  render() {
    const { items } = this.props;
    const { isOpen } = this.state;

    return (
      <div styleName="wrapper">
        <button
          type="button"
          styleName="button"
          onClick={this.handleToggle}
        >
          <p>{items[selectedIndex].text}</p>
          <i className="material-icons">expand_more</i>
        </button>

        {isOpen && (
          <div className="dropdown">
            {items.length > 0 ? (
              items.map( item => (
                <button
                  type="button"
                >
                  {item.text}
                </button>
              ))
            ) : (
              <p>No items to show.</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;

Dropdown.propTypes = {
  width: oneOfType(
    [number, string]
  ),
  height: oneOfType(
    [number, string]
  ),
  display: oneOf(
    ['block', 'none', 'flex']
  ),
  flex: string,
  justifyContent: oneOf(
    ['space-between', 'space-around', 'center', 'flex-start', 'flex-end']
  ),
  alignItems: oneOf(
    ['space-between', 'space-around', 'center', 'flex-start', 'flex-end']
  ),
  flexDirection: oneOf(
    ['row', 'column', 'row-reverse', 'column-reverse']
  ),
  margin: oneOfType(
    [number, string]
  ),
  marginX: oneOfType(
    [number, string]
  ),
  marginY: oneOfType(
    [number, string]
  ),
  marginLeft: oneOfType(
    [number, string]
  ),
  marginRight: oneOfType(
    [number, string]
  ),
  marginTop: oneOfType(
    [number, string]
  ),
  marginBottom: oneOfType(
    [number, string]
  ),
  padding: oneOfType(
    [number, string]
  ),
  paddingX: oneOfType(
    [number, string]
  ),
  paddingY: oneOfType(
    [number, string]
  ),
  paddingLeft: oneOfType(
    [number, string]
  ),
  paddingRight: oneOfType(
    [number, string]
  ),
  paddingTop: oneOfType(
    [number, string]
  ),
  paddingBottom: oneOfType(
    [number, string]
  ),
  children: node,
  backgroundColor: string,
  softEdges: bool,
  borderSize: number,
  borderColor: string,
  borderStyle: string,
};

export default Dropdown;
