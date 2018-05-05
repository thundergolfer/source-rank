import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { Api } from 'utils';
import { fetchMethodologyHeuristics, selectMethodologyHeuristic } from 'flux/actions';
import Layout from 'views/layout';
import { Heading, Box, Dropdown, Button, Icon, Underline } from 'views/components';

class Home extends Component {
  static propTypes = {
    fetchMethodologyHeuristics: func,
    methodology: object,
    selectMethodologyHeuristic: func,
  }

  state = {
    fetchingPublications: false,
    fetchingRankings: false,
    fetchedPublications: false,
    fetchedRankings: false,
    error: null,
    publications: [],
    rankings: [],
  }

  componentDidMount() {
    this.props.fetchMethodologyHeuristics();

    this.fetchPublications();
  }

  componentDidUpdate( prevProps ) {
    if ( prevProps.methodology.heuristics.active !== this.props.methodology.heuristics.active )
      this.fetchPublicationRankings();
  }

  fetchPublications = async () => {
    this.setState({ fetchingPublications: true });

    try {
      const { data } = await Api.getPublications();

      this.setState({ publications: data });
    }
    catch ( error ) {
      this.setState({ error });
    }
    finally {
      this.setState({ fetchingPublications: false });
    }
  }

  fetchPublicationRankings = async () => {
    const { active } = this.props.methodology.heuristics;

    this.setState({ fetchingRankings: true });

    try {
      const { data } = await Api.getPublicationRankings( active );

      this.setState({ rankings: data });
    }
    catch ( error ) {
      this.setState({ error });
    }
    finally {
      this.setState({ fetchingRankings: false });
    }
  }

  handleChange = item => {
    this.props.selectMethodologyHeuristic( item.id );
  }

  render() {
    const { heuristics } = this.props.methodology;
    const { fetchingPublications, fetchingRankings, rankings, publications, error } = this.state;
    const heuristicsData = (
      heuristics.fetched &&
      Object.keys( heuristics.data ).map( heuristic => heuristics.data[heuristic] )
    );

    console.log( this.state );

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
            <Underline
              color="purple"
              style={{
                fontWeight: 'bold',
                marginLeft: 10,
              }}
            >
              {heuristics.data[heuristics.active]
                ? heuristics.data[heuristics.active].name
                : 'No heuristic selected!'}
            </Underline>
          </p>

          <Box
            marginTop={40}
            marginBottom={40}
          >
            {(
              fetchingPublications ||
              fetchingRankings
            ) ? (
              <p>Loading...</p>
            ) : (
              error ? (
                <p>Error!</p>
              ) : (
                publications.length > 0 ? (
                  publications
                    .slice( 0, 100 )
                    .map( publication => {
                      const { rank } = rankings.publications.find( pub => pub.id === publication.id );
                      const color = ( rank >= 8 ) ? '#2ecc71' // Green
                        : ( rank >= 5 ) ? '#f39c12' // Orange
                        : '#e74c3c'; // Red

                      console.log({ rank, color }); // eslint-disable-line no-console

                      return (
                        <Box
                          key={publication.id}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          borderColor={color}
                          borderSize={2}
                          softEdges
                          marginBottom={15}
                          padding={15}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                          >
                            <p
                              style={{
                                margin: 0,
                                marginLeft: 10,
                                marginRight: 20,
                                fontSize: '2rem',
                                color,
                              }}
                            >
                              {rank}.
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontSize: '1.5rem',
                              }}
                            >
                              {publication.name}
                            </p>
                          </Box>

                          <img
                            src={publication.icon_url}
                            style={{
                              height: 50,
                              width: 50,
                              border: '1px solid #DDD',
                            }}
                          />
                        </Box>
                      );
                    })
                  ) : (
                    <p>No publications to show</p>
                  )
                )
              )
            }
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
