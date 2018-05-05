import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { Link } from 'views/components';
import { fetchMethodologyHeuristics } from 'flux/actions';
import ReactMarkdown from 'react-markdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Heading, Box, Dropdown, Button, Icon } from 'views/components';
import Layout from 'views/layout';

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
      <Layout
        backgroundWaves
        container
        header
      >
        <Box
          display="flex"
          marginTop={50}
          marginX={100}
        >
          <Box
            flexGrow={1}
            flexBasis={0}
            marginTop={20}
            marginRight={50}
          >
            <Box marginBottom={40}>
              <Heading
                size="lg"
                color="white"
              >
                Our Heuristics
              </Heading>
            </Box>
          </Box>
        </Box>
        <Box marginBottom={50} >
          {(
            heuristicsData &&
            heuristicsData.length > 0
          ) && heuristicsData.map(( item, index ) => (
            <Box
              key={item.id}
              padding={10}
              backgroundColor="white"
              borderSize={2}
              borderColor="purple"
              softEdges
              width={'97%'}
              padding={10}
              marginTop={10}
            >
              <h2 style={{ margin: 0 }}>
                {item.name}
              </h2>
              <div style={{ margin: 0 }}>
                <ReactMarkdown source={item.description} />
              </div>
            </Box>
          ))}
        </Box>
      </Layout>
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
