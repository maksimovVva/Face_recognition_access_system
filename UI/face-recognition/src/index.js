import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import registerServiceWorker from "./registerServiceWorker";

import { createRootStore, rootMiddleware } from "boilerplate";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import App, { appReducer } from "./app";

const root = document.getElementById("root");
const initialState = {};

ReactDOM.render(
    <Router>
        <Provider
            store={createRootStore(initialState, appReducer, [rootMiddleware])}
        >
            <App />
        </Provider>
    </Router>,
    root
);

registerServiceWorker();
