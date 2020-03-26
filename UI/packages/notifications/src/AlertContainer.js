import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Alert from "./Alert";
import notificationType from "./notification.type";

import hideAlert from "./alert-behaviour/hide-alert.behaviour";

const AlertContainer = ({ dispatch, messages }) => {
    return (
        <div className="alert-container">
            {messages.map((message, index) => (
                <Alert
                    key={index}
                    text={message.text}
                    type={message.type}
                    dismissCallback={() => dispatch(hideAlert(message.text))}
                />
            ))}
        </div>
    );
};

AlertContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape(notificationType)).isRequired
};

const mapStateToProps = state => {
    return { ...state.notifications.alerts };
};

export default connect(mapStateToProps)(AlertContainer);
