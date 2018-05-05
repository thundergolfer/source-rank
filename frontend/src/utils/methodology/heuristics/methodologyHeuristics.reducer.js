const initialState = {
  fetching: false,
  fetched: false,
  error: null,
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

    case 'FETCH_METHODOLOGY_HEURISTICS_SUCCESS':
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: payload,
      };

    case 'FETCH_METHODOLOGY_HEURISTICS_FAILURE':
      return {
        ...state,
        fetching: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default reducer;
