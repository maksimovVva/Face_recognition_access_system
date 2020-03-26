import React from "react";
import PropTypes from "prop-types";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead-bs4.css";

import { stub } from "utils";

class AutoComplete extends React.Component {
    constructor(props) {
        super(props);

        this.typeaheadRef = React.createRef();
        this.state = { selected: props.value };
    }

    static defaultProps = {
        onChange: stub,
        size: "small"
    };

    focus() {
        const current = this.typeaheadRef.current;
        current &&
            current.getInstance &&
            current.getInstance() &&
            current.getInstance().focus();
    }

    get value() {
        return this.state.selected;
    }

    render = () => {
        const { items, size, onChange, ...props } = this.props;

        return (
            <Typeahead
                selectHintOnEnter={true}
                options={items}
                onChange={selected => {
                    const values = selected.length > 0 ? selected : undefined;
                    this.setState({ selected: values }, () => onChange(values));
                }}
                ref={this.typeaheadRef}
                selected={this.state.selected}
                bzSize={size}
                {...props}
            />
        );
    };
}

AutoComplete.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.object
        ])
    ).isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.array
    ]),
    size: PropTypes.string,
    labelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

export default AutoComplete;
