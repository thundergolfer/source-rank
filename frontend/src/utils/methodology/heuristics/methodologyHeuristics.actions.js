export const fetchMethodologyHeuristics = () => ({
  type: 'FETCH_METHODOLOGY_HEURISTICS_REQUEST',
});

export const fetchMethodologyHeuristicsSuccess = data => ({
  type: 'FETCH_METHODOLOGY_HEURISTICS_SUCCESS',
  payload: data,
});

export const fetchMethodologyHeuristicsFailure = error => ({
  type: 'FETCH_METHODOLOGY_HEURISTICS_FAILURE',
  payload: error,
});
