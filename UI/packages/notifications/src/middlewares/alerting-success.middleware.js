import { isSuccess } from "core";

import buildActionLabel from "./action-label.builder";
import { SUCCESS_ALERT } from "../alert.types";
import showAlert from "../alert-behaviour/show-alert.behaviour";

const alertingSuccess = (config = {}) => store => next => action => {
    next(action);

    if (!isSuccess(action.type)) return;

    const alertText =
        buildActionLabel(config.labels, action, { logging: false }) || "";

    alertText && store.dispatch(showAlert(SUCCESS_ALERT, alertText));
};

export default alertingSuccess;
