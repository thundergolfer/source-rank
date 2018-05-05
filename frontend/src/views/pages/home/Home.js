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
            marginRight={50}
          >
            <Box marginBottom={40}>
              <Heading
                size="md"
                color="white"
              >
                Choose a news quality signal
              </Heading>
            </Box>

            <Dropdown items={heuristicsData} onChange={this.handleChange}>
              {({ selectedIndex, onSelect, isOpen, onToggle }) => (
                <Box
                  position="relative"
                >
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
                    <Box
                      position="absolute"
                      top="100%"
                      left={0}
                      width="100%"
                      backgroundColor="white"
                      borderSize={2}
                      borderColor="purple"
                      softEdges
                      padding={10}
                    >
                      {heuristicsData.map(( item, index ) => (
                        <Box
                          key={item.id}
                          onClick={onSelect( index )}
                          padding={10}
                        >
                          <p style={{ margin: 0 }}>
                            {item.name}
                          </p>
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
              minHeight={300}
            >
              <Box marginBottom={25}>
                <Heading
                  color="black"
                  size="md"
                >
                  {heuristics.active == null
                    ? 'Select a heuristic!'
                    : heuristics.data[heuristics.active].name}
                </Heading>
              </Box>

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

        <Box
          marginTop={100}
        >
          <Heading
            size="xl"
            color="black"
          >
            Ranked Publications
          </Heading>

          <p>
            News and media content sites ranked according to the heuristic:&nbsp;
            {heuristicsData
              ? heuristicsData[heuristics.active].name
              : 'No heuristic selected!'}
          </p>
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
