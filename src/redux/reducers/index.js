// reducers.js
import { combineReducers } from 'redux';
import footReducer from './foot';

// 合并所有reducers
export default combineReducers({
	foot: footReducer
})
  