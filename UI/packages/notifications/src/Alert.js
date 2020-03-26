import React from "react";

import "./alerts.css";

import notificationType from "./notification.type";
import { SUCCESS_ALERT } from "./alert.types";

const maxMessageLength = 300;
const defaultType = SUCCESS_ALERT;
const cuttingSuffix = "...";

const Alert = ({ text = "", type, dismissCallback }) => {
    const message = text.substring(0, maxMessageLength);

    const alertType = type || defaultType;

    return (
        <div
            className={`alert alert-${alertType} alert-dismissible fade show`}
            role="alert"
        >
            {message}
            {text.length >= maxMessageLength && cuttingSuffix}
            <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={dismissCallback}
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};

Alert.propTypes = notificationType;

export default Alert;
