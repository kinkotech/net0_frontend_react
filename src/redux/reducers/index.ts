// reducers.js
import { combineReducers } from 'redux';
import footReducer from './foot';
import commonReducer from './common';
import reductionReducer from './reduction';

// 合并所有reducers
export default combineReducers({
	foot: footReducer,
	common: commonReducer,
	reduction: reductionReducer
})
  