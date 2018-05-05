const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  active: null,
  data: {},
};

const reducer = ( state = initialState, { type, payload }) => {
  switch ( type ) {
    case 'FETCH_METHODOLOGY_HEURISTICS_REQUEST':
      return {
        ...state,
        fetching: true,
        error: null,
      };

    case 'FETCH_METHODOLOGY_HEURISTICS_SUCCESS': {
      const active = (
        state.active == null &&
        payload instanceof Array &&
        payload.length > 0
      )
        ? payload[0].id
        : state.active;

      return {
        ...state,
        active,
        fetching: false,
        fetched: true,
        data: payload.reduce(( resultant, heuristic ) => {
          resultant[heuristic.id] = heuristic;

          return resultant;
        }, {}),
      };
    }

    case 'FETCH_METHODOLOGY_HEURISTICS_FAILURE':
      return {
        ...state,
        fetching: false,
        error: payload,
      };

    case 'SELECT_METHODOLOGY_HEURISTIC':
      return {
        ...state,
        active: payload,
      };

    default:
      return state;
  }
};

export default reducer;
