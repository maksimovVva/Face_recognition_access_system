import React from "react";
import PropTypes from "prop-types";

const ListItem = ({ View, props }) => {
    return <View {...props} />;
};

ListItem.propTypes = {
    View: PropTypes.func.isRequired
};

export default ListItem;
