import React from "react";
import PropTypes from "prop-types";

import { stub } from "utils";

class Checkbox extends React.Component {
    static defaultProps = {
        className: "",
        id: "",
        onChange: stub
    };

    render() {
        const { id, onChange, name, value, checked, className } = this.props;

        return (
            <div className={`form-check ${className}`}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={id}
                    value={value}
                    checked={checked}
                    onClick={e => {
                        e.stopPropagation();
                        onChange({ value, checked: e.target.checked });
                    }}
                />
                <label className="form-check-label" htmlFor={id}>
                    {name}
                </label>
            </div>
        );
    }
}

Checkbox.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func
};

export default Checkbox;
