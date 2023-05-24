import { applyMiddleware, createStore, combineReducers } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { createBrowserHistory } from "history";
import models from "./model";


const epicMiddleware = createEpicMiddleware();
const history = createBrowserHistory();
const epics = [];
const reducers = {
  router: connectRouter(history), // key 必须是 'router'
};

models.forEach((v) => {
  if (v.epics) {
    epics.push(v.epics);
  }

  if (v.reducers) {
    reducers[v.namespace] = v.reducers;
  }
});


const middlewareList = [routerMiddleware(history), epicMiddleware];

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(...middlewareList)
);
epicMiddleware.run(combineEpics(...epics));


export default store;