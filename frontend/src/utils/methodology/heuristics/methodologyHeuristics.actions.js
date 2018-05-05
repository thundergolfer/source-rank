import { Api } from '../../index';

export const fetchMethodologyHeuristics = () => {
  return async dispatch => {
    dispatch({
      type: 'FETCH_METHODOLOGY_HEURISTICS_REQUEST',
    });

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
