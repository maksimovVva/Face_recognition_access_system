import React from "react";
import PropTypes from "prop-types";

const Column = ({ title, View, gridSize, HeaderControls }) => {
    return (
        <section className={`col-${gridSize} column`}>
            <header
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}
            >
                <h6>{title}</h6>
                {HeaderControls && <HeaderControls />}
            </header>

            <View />
        </section>
    );
};

Column.propTypes = {
    title: PropTypes.string.isRequired,
    View: PropTypes.func.isRequired,
    gridSize: PropTypes.number.isRequired,
    Controls: PropTypes.func
};

export default Column;
