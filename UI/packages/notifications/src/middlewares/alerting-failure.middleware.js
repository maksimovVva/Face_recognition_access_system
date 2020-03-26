import { isFailure } from "core";

import buildActionLabel from "./action-label.builder";
import { ERROR_ALERT } from "../alert.types";
import showAlert from "../alert-behaviour/show-alert.behaviour";

const alertingFailure = (config = {}) => store => next => action => {
    next(action);

    if (!isFailure(action.type)) return;

    const alertText =
        buildActionLabel(config.labels, action) || "Internal Server Error.";

    store.dispatch(showAlert(ERROR_ALERT, alertText));
};

export default alertingFailure;
