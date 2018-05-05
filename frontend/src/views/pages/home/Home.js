import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { fetchMethodologyHeuristics, selectMethodologyHeuristic } from 'flux/actions';
import Layout from 'views/layout';
import { Heading, Box, Dropdown, Button, Icon } from 'views/components';

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
          marginX={100}
        >
          <Box
            flexGrow={1}
            flexBasis={0}
            marginTop={20}
            marginRight={100}
          >
            <Box marginBottom={40}>
              <Heading
                size="lg"
                color="white"
              >
                Choose a news quality signal
              </Heading>
            </Box>

            <Dropdown items={heuristicsData} onChange={this.handleChange}>
              {({ selectedIndex, onSelect, isOpen, onToggle }) => (
                <Box>
                  <Button
                    onClick={onToggle}
                    color="white"
                    width="100%"
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      flexDirection="row"
                      marginRight={10}
                      marginLeft={10}
                    >
                      <Box marginRight={10}>
                        {(
                          heuristicsData &&
                          heuristicsData.length > 0
                        )
                          ? heuristicsData[selectedIndex].name
                          : heuristics.fetching
                            ? 'Loading...'
                            : 'Failed to load heuristics.'}
                      </Box>

                      <Icon
                        name="expand_more"
                        color="white"
                      />
                    </Box>
                  </Button>

                  {(
                    isOpen &&
                    heuristicsData &&
                    heuristicsData.length > 0
                  ) && (
                    <Box>
                      {heuristicsData.map(( item, index ) => (
                        <Box
                          key={item.id}
                          onClick={onSelect( index )}
                        >
                          {item.name}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              )}
            </Dropdown>
          </Box>

          <Box
            flexGrow={1}
            flexBasis={0}
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
