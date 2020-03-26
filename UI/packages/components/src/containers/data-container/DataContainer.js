import React from "react";
import PropTypes from "prop-types";
import LazyLoading from "react-list-lazy-load";

import Loader from "../../Loader";

import "./data-container.css";

class DataContainer extends React.Component {
    constructor(props) {
        super(props);

        const { loadItems } = this.props;

        this.loadItems = loadItems;
    }

    componentDidMount() {
        this.loadItems();
    }

    render() {
        const { ItemsView, items, itemsCount, takeCount, loading } = this.props;

        return (
            <div className="list-container">
                <LazyLoading
                    items={items}
                    length={itemsCount}
                    pageSize={takeCount}
                    onRequestPage={this.loadItems}
                >
                    <ItemsView {...this.props} />
                </LazyLoading>
                {loading && (
                    <div className="loader">
                        <Loader
                            type="Puff"
                            color="#343a40"
                            height="30"
                            width="30"
                        />
                    </div>
                )}
            </div>
        );
    }
}

DataContainer.propTypes = {
    loadItems: PropTypes.func.isRequired,
    ItemsView: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.func.isRequired
    ]).isRequired
};

export default DataContainer;
