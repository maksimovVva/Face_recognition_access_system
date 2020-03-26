import React from "react";

import "./overlay.css";

const Overlay = ({ children }) => {
    return (
        <div className="overlay">
            <div className="overlay-content">{children}</div>
        </div>
    );
};

export default Overlay;
