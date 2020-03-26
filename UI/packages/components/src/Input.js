import React from "react";
import PropTypes from "prop-types";

class Input extends React.Component {
    static defaultProps = {
        captionColumns: 2
    };

    render() {
        const {
            id,
            caption,
            value,
            captionColumns,
            onChange,
            maxLength,
            placeholder,
            className = '',
            labelClassName = '',
            type = "text"
        } = this.props;

        return (
            <div className={`form-group row ${className}`}>
                <label
                    htmlFor={id}
                    className={`col-md-${captionColumns} col-form-label ${labelClassName}`}
                >
                    {caption}
                </label>
                <div className={`col-md-${12 - captionColumns}`}>
                    <input
                        type={type}
                        className="form-control"
                        id={id}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        maxLength={maxLength}
                    />
                </div>
            </div>
        );
    }
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    value: PropTypes.string,
    captionColumns: PropTypes.number
};

export default Input;
