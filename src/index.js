import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import moment from "moment";

import { Provider } from "mobx-react";
import makeInspectable from "mobx-devtools-mst";
import stores from "Models/stores";

import AppContent from "./app";

import "moment/locale/zh-cn";
import "./index.css";
import "./color.css";
import "nprogress/nprogress.css";

import * as serviceWorker from "./serviceWorker";

moment.locale("zh-cn");

if (process.env.NODE_ENV !== "development") {
  console.log = () => {};
}

if (process.env.NODE_ENV === "development") {
  makeInspectable(stores);
}

const App = () => (
  <BrowserRouter
    getUserConfirmation={(message, callback) => {
      // this is the default behavior
      const allowTransition = window.confirm(message);
      callback(allowTransition);
    }}
  >
    <Provider {...stores}>
      <AppContent />
    </Provider>
  </BrowserRouter>
);

Loadable.preloadReady().then(() => {
  ReactDOM.render(<App />, document.getElementById("app"));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.register()
serviceWorker.unregister();
