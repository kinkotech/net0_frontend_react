// store.js
// 引入api，creatStore用于创建store对象
// import { legacy_createStore as createStore, applyMiddleware } from 'redux'
// import allReducers from './reducers/index'
// import thunk from 'redux-thunk'


// export default createStore(allReducers, applyMiddleware(thunk))


import { createStore } from 'redux';
import rootReducer from './reducers'; // 根据需要创建reducers

const store = createStore(rootReducer);

export default store;
