import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { Link } from 'views/components';
import { fetchMethodologyHeuristics } from 'flux/actions';
import ReactMarkdown from 'react-markdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Heading, Box, Dropdown, Button, Icon } from 'views/components';

class Methodology extends Component {
  static propTypes = {
    fetchMethodologyHeuristics: func,
    methodology: object,
  }

  componentDidMount() {
    this.props.fetchMethodologyHeuristics();
  }

  render() {
    const { heuristics } = this.props.methodology;
    const heuristicsData = (
      heuristics.fetched &&
      Object.keys( heuristics.data ).map( heuristic => heuristics.data[heuristic] )
    );
    console.log(heuristicsData);

    return (
      <div>
        <h1>Methodology</h1>
        {(
          heuristicsData &&
          heuristicsData.length > 0
        ) && heuristicsData.map(( item, index ) => (
          <Box
            key={item.id}
            padding={10}
          >
            <p style={{ margin: 0 }}>
              {item.name}
            </p>
            <p style={{ margin: 0 }}>
              {item.description}
            </p>
          </Box>
        ))}
        <Link to="/">
          <p>Home</p>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  methodology: state.methodology,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchMethodologyHeuristics,
  }, dispatch );
};

export default connect( mapStateToProps, mapDispatchToProps )( Methodology );
