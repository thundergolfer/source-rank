import { combineReducers } from 'redux';
import heuristics from './heuristics/methodologyHeuristics.reducer';

const reducer = combineReducers({
  heuristics,
});

export default reducer;
