import React, { Component } from 'react';
import { func } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMethodologyHeuristics } from 'flux/actions';
import Layout from 'views/layout';
import { Heading, Box, Dropdown } from 'views/components';

const data = [
  {
    name: 'I trust in experts',
    description: 'In order to gain the best information on topics such as economics, politics, philosophy, biology etc turn to the experts on those fields, who dedicate themselves to specialising in complex problem domains. So in order honor this information-quality heuristic, we evaluate publication on the basis of how many academics contribute to the publication. Use this heuristic is you care that a publishers has experts contributing to their publication, and not amateurs.',
    key: 'trust-the-experts',
    id: 1,
  },
  {
    name: 'I want science backed information',
    description: 'Science is perhaps the greatest knowledge seeking tool of mankind. Often where scientific knowledge exists it is ignored or misused by content publishers. Use this heuristic if you are most interested in sources that put a strong emphasis on respect of scientific expertise and the scientific method.',
    key: 'is-pro-science',
    id: 3,
  },
  {
    name: 'I don\'t want click-funded content',
    description: 'This heuristic asks if a publication has a subscription revenue model. Purely click-funded publications have mis-aligned incentives with users. They are motivated to sensationalise, mislead and fabricate in order to drive \'clicks\'. Publications that have a subscription model are not as incentivised to drive clicks, and instead seek to gain the respect and loyalty of their paying subscribers.',
    key: 'has-subscription-revenue',
    id: 2,
  },
  {
    name: 'I want to avoid highly biased sources',
    description: 'Whether left or right, political bias has a tendency distort information reporting away from factual and towards ideological. Do note however, that high bias is not necessarily an negative. To assume so is to commit the [*Argument to Moderation*](https://en.wikipedia.org/wiki/Argument_to_moderation) fallacy',
    key: 'bias',
    id: 4,
  },
  {
    name: 'I value sources',
    description: 'Good information is typically *dense* information. A lack of links to external websites is a signal of shallow and/or facile analyis.',
    key: 'i-value-sources',
    id: 5,
  },
];

class Home extends Component {
  static propTypes = {
    fetchMethodologyHeuristics: func,
  }

  componentDidMount() {
    this.props.fetchMethodologyHeuristics();
  }

  handleChange = item => {
    console.log({ item });
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

            <Dropdown items={data} onChange={this.handleChange}>
              {({ selectedIndex, onSelect, isOpen, onToggle }) => (
                <div>
                  <button
                    onClick={onToggle}
                  >
                    {data[selectedIndex].name}
                  </button>

                  {isOpen && (
                    <ul>
                      {data.map(( item, index ) => (
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
