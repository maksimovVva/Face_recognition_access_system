import React from "react";
import PropTypes from "prop-types";

import { stub } from "utils";

import "./text-editor.css";

class TextEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentValue: props.value,
            value: props.value
        };

        this.areaRef = React.createRef();

        this.submit = this._submit.bind(this);
        this.cancel = this._cancel.bind(this);
        this.saveValue = this._saveValue.bind(this);
    }

    static defaultProps = {
        onCancel: stub,
        onSubmit: stub
    };

    focus() {
        this.areaRef.current.focus();
    }

    get value() {
        return this.state.value;
    }

    _saveValue(event) {
        this.setState({ currentValue: event.target.value });
    }

    _submit(event) {
        event.stopPropagation();
        const text = this.areaRef.current.value;
        this.setState({ value: text }, this.props.onSubmit);
    }

    _cancel(event) {
        event.stopPropagation();

        this.props.onCancel();
    }

    render() {
        return (
            <div className="text-editor">
                <textarea
                    className={`form-control ${this.props.className}`}
                    onClick={event => event.stopPropagation()}
                    onBlur={this.cancel}
                    onChange={this.saveValue}
                    value={this.state.currentValue}
                    ref={this.areaRef}
                    maxLength={this.props.maxLength}
                />
                <span
                    className="text-editor-button submit"
                    onMouseDown={this.submit}
                />
                <span
                    className="text-editor-button decline"
                    onClick={this.cancel}
                />
            </div>
        );
    }
}

TextEditor.propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default TextEditor;
