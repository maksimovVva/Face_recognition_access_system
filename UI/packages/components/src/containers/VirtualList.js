import React from "react";
import PropTypes from "prop-types";
import ReactList from "react-list";

import ListItem from "./ListItem";

export class VirtualList extends React.Component {
    constructor(props) {
        super(props);

        this.listRef = React.createRef();
    }

    render() {
        const { items, ItemView, itemProps } = this.props;

        return (
            <ReactList
                itemRenderer={(index, defaultKey) => {
                    const item = items[index];

                    const key = itemProps && itemProps.key;
                    const calculatedKey =
                        typeof key === "function" ? key(item) : key;

                    return (
                        <ListItem
                            key={calculatedKey || defaultKey}
                            View={ItemView}
                            props={{ item: item, ...itemProps }}
                        />
                    );
                }}
                length={items.length}
                type="variable"
                ref={this.listRef}
            />
        );
    }
}

VirtualList.propTypes = {
    items: PropTypes.array.isRequired,
    ItemView: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.func.isRequired
    ]).isRequired,
    itemProps: PropTypes.shape({
        key: PropTypes.oneOfType([
            PropTypes.func.isRequired,
            PropTypes.number.isRequired,
            PropTypes.string.isRequired
        ])
    })
};

_proxify(VirtualList, container => container.listRef.current);

export default VirtualList;

/**
 * Initiate extending specific container for support all methods of 'react-list' instance
 * @param containerType container which considered as proxy of 'react-list'
 * @param getList method which provides access to 'react-list' instance
 * @private
 */
function _proxify(containerType, getList) {
    const proxyMethods = [
        "getOffset",
        "getScrollParent",
        "getScroll",
        "setScroll",
        "getViewportSize",
        "getScrollSize",
        "getStartAndEnd",
        "getItemSizeAndItemsPerRow",
        "getSpaceBefore",
        "getSizeOf",
        "scrollTo",
        "scrollAround",
        "getVisibleRange"
    ];

    proxyMethods.forEach(name => {
        VirtualList.prototype[name] = function(...args) {
            return getList(this)[name](...args);
        };
    });
}
