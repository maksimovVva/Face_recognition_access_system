import PropTypes from "prop-types";

const notificationType = {
    dismissCallback: PropTypes.func,
    text: PropTypes.string.isRequired,
    type: PropTypes.string
};

export default notificationType;
