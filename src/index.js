import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createBrowserHistory } from "history";
import models from "./model";
import "@/common/style/reset.scss";
import App from "./App";


const epicMiddleware = createEpicMiddleware()
const history = createBrowserHistory();
const epics = [];
const reducers = {
  // key 必须是 'router'  [详情](https://github.com/supasate/connected-react-router/tree/v6.0.0#usage)
  router: connectRouter(history),
};

models.forEach((v) => {
  if (v.epics) {
    epics.push(v.epics);
  }

  if (v.reducers) {
    reducers[v.namespace] = v.reducers;
  }
});

const middlewareList = [
  routerMiddleware(history),
  epicMiddleware.run(combineEpics(...epics))
  // createEpicMiddleware(combineEpics(...epics)),
];

const store = createStore(
  combineReducers(reducers),
  {},
  composeWithDevTools(applyMiddleware(...middlewareList))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
