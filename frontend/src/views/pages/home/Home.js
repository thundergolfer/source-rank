import React, { Component } from 'react';
import { func } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMethodologyHeuristics } from 'flux/actions';
import Layout from 'views/layout';
import { Heading, Box } from 'views/components';

class Home extends Component {
  static propTypes = {
    fetchMethodologyHeuristics: func,
  }

  componentDidMount() {
    this.props.fetchMethodologyHeuristics();
  }

  render() {
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
                "I trust the experts"
              </Heading>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada nunc vitae nunc semper molestie. Cras commodo lectus sit amet diam tincidunt, quis posuere arcu posuere. Quisque magna turpis, molestie in iaculis quis, sollicitudin eu nibh.</p>
              <p>Ut eget est eu enim luctus accumsan. Donec quis purus vitae lectus vestibulum commodo. Mauris ac quam dui. Ut sit amet justo ac dolor ullamcorper dictum nec vitae felis. Duis faucibus aliquam nisi at sollicitudin. Maecenas fermentum blandit sem vitae sagittis.</p>
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
  return bindActionCreators({ fetchMethodologyHeuristics }, dispatch );
};

export default connect( mapStateToProps, mapDispatchToProps )( Home );
