import { Component } from 'react';
import { func, array } from 'prop-types';

class Dropdown extends Component {
  static propTypes = {
    children: func,
    onChange: func,
    items: array.isRequired,
  }

  state = {
    selectedIndex: 0,
    isOpen: false,
  }

  handleSelect = index => () => {
    this.setState({
      selectedIndex: index,
      isOpen: false,
    });

    if ( this.props.onChange ) {
      const { items } = this.props;

      this.props.onChange( items[index] );
    }
  }

  handleToggle = () => {
    this.setState( state => ({ isOpen: !state.isOpen }));
  }

  render() {
    const { children } = this.props;

    return children({
      onSelect: this.handleSelect,
      isOpen: this.state.isOpen,
      selectedIndex: this.state.selectedIndex,
      onToggle: this.handleToggle,
    });
  }
}

export default Dropdown;
