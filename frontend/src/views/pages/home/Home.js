import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { fetchMethodologyHeuristics, selectMethodologyHeuristic } from 'flux/actions';
import Layout from 'views/layout';
import { Heading, Box, Dropdown } from 'views/components';

class Home extends Component {
  static propTypes = {
    fetchMethodologyHeuristics: func,
    methodology: object,
    selectMethodologyHeuristic: func,
  }

  componentDidMount() {
    this.props.fetchMethodologyHeuristics();
  }

  handleChange = item => {
    this.props.selectMethodologyHeuristic( item.id );
  }

  render() {
    const { heuristics } = this.props.methodology;
    const heuristicsData = (
      heuristics.fetched &&
      Object.keys( heuristics.data ).map( heuristic => heuristics.data[heuristic] )
    );

    return (
      <Layout
        backgroundWaves
        container
        header
      >
        <Box
          display="flex"
          marginTop={50}
        >
          <Box
            flex={1}
            marginTop={20}
          >
            <Heading
              size="lg"
              color="white"
            >
              Choose a news quality signal
            </Heading>

            <Dropdown items={heuristicsData} onChange={this.handleChange}>
              {({ selectedIndex, onSelect, isOpen, onToggle }) => (
                <div>
                  <button
                    onClick={onToggle}
                  >
                    {(
                      heuristicsData &&
                      heuristicsData.length > 0
                    )
                      ? heuristicsData[selectedIndex].name
                      : heuristics.fetching
                        ? 'Loading...'
                        : 'Failed to load heuristics.'}
                  </button>

                  {(
                    isOpen &&
                    heuristicsData &&
                    heuristicsData.length > 0
                  ) && (
                    <ul>
                      {heuristicsData.map(( item, index ) => (
                        <li
                          key={item.id}
                          onClick={onSelect( index )}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </Dropdown>
          </Box>

          <Box
            flex={1}
          >
            <Box
              backgroundColor="white"
              width="100%"
              padding={20}
              paddingBottom={70}
              softEdges
              borderSize={2}
              borderColor="purple"
            >
              <Heading
                color="black"
                size="lg"
              >
                {heuristics.active == null
                  ? 'Select a heuristic!'
                  : heuristics.data[heuristics.active].name}
              </Heading>

              <p>
                {heuristics.active == null
                  ? 'Select a heuristic!'
                  : (
                    <ReactMarkdown
                      source={heuristics.data[heuristics.active].description}
                    />
                  )}
              </p>
            </Box>
          </Box>
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
    selectMethodologyHeuristic,
  }, dispatch );
};

export default connect( mapStateToProps, mapDispatchToProps )( Home );
