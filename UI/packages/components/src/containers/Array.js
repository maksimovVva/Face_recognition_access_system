import React from "react";
import PropTypes from "prop-types";

import { stub } from "utils";

class Array extends React.Component {
    static defaultProps = {
        className: "",
        itemProps: stub
    };

    render() {
        const {
            className,
            itemClassName,
            items,
            ItemView,
            itemProps,
            ...props
        } = this.props;

        return (
            <ul className={className} {...props}>
                {items.map(item => {
                    const key = item.key || item.id || item.name;
                    return (
                        <li className={itemClassName} key={key}>
                            <ItemView {...item} {...itemProps(item)} />
                        </li>
                    );
                })}
            </ul>
        );
    }
}

Array.propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    items: PropTypes.array.isRequired,
    ItemView: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.func.isRequired
    ]).isRequired,
    itemProps: PropTypes.func
};

const arrayOf = ArrayItem => {
    class GenericArray extends React.Component {
        static propTypes = Array.propTypes;

        render() {
            return <Array ItemView={ArrayItem} {...this.props} />;
        }
    }

    const itemType = ArrayItem.displayName || ArrayItem.name;
    GenericArray.displayName = `GenericArray<${itemType}>`;

    return GenericArray;
};

export { arrayOf };

export default Array;
