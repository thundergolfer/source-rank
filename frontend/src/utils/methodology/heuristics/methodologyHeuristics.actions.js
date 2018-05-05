// import { Api } from '../../index';

export const fetchMethodologyHeuristics = () => {
  return async dispatch => {
    dispatch({
      type: 'FETCH_METHODOLOGY_HEURISTICS_REQUEST',
    });

    dispatch({
      type: 'FETCH_METHODOLOGY_HEURISTICS_SUCCESS',
      payload: [
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
      ],
    });

    /*
    FIXME: make this actually fetch data when CORS is fixed

    try {
      const { data } = await Api.getMethodologyHeuristics();

      dispatch(
        fetchMethodologyHeuristicsSuccess( data )
      );
    }
    catch ( error ) {
      dispatch(
        fetchMethodologyHeuristicsFailure( error )
      );
    }
    */
  };
};

export const fetchMethodologyHeuristicsSuccess = data => ({
  type: 'FETCH_METHODOLOGY_HEURISTICS_SUCCESS',
  payload: data,
});

export const fetchMethodologyHeuristicsFailure = error => ({
  type: 'FETCH_METHODOLOGY_HEURISTICS_FAILURE',
  payload: error,
});
