import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import sagas from './sagas'
import { routerMiddleware } from 'react-router-redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const createHistory = require('history').createHashHistory;
const history = createHistory();   // 初始化history
const routerWare = routerMiddleware(history);

// 创建 saga 中间件
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, routerWare));

const store = createStore(
	reducer,
  {},
	enhancer
)

// 初始化时调用
sagaMiddleware.run(sagas)

export default store