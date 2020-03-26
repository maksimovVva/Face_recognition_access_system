import { mergeReducers } from "core";

import * as types from "./src/alert.types";

import hideAlert from "./src/alert-behaviour/hide-alert.behaviour";
import showAlert from "./src/alert-behaviour/show-alert.behaviour";
import {
    reducers as showAlertReducers,
    SHOW_ALERT
} from "./src/alert-behaviour/show-alert.behaviour";
import {
    reducers as hideAlertReducers,
    HIDE_ALERT
} from "./src/alert-behaviour/hide-alert.behaviour";
import initialSate from "./src/alert-behaviour/alerts.state";

import alertingFailureMiddleware from "./src/middlewares/alerting-failure.middleware";
import alertingSuccessMiddleware from "./src/middlewares/alerting-success.middleware";

const actions = { hideAlert, showAlert };

const reducer = mergeReducers(
    {
        ...showAlertReducers,
        ...hideAlertReducers
    },
    initialSate
);

export {
    actions,
    reducer,
    types,
    SHOW_ALERT,
    HIDE_ALERT,
    alertingFailureMiddleware,
    alertingSuccessMiddleware
};
export { default } from "./src/AlertContainer";
