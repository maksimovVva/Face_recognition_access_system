import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const contextHoc = (propKey, selector, valueType = PropTypes.object) => {
    const { Provider, Consumer } = React.createContext([]);

    return {
        provide: Component => {
            class ProviderWrapper extends React.Component {
                render() {
                    const { value, ...props } = this.props;

                    return (
                        <Provider value={value}>
                            <Component {...props} />
                        </Provider>
                    );
                }
            }

            ProviderWrapper.propTypes = {
                value: valueType
            };

            const mapStateToProps = state => ({ value: selector(state) });
            return connect(mapStateToProps)(ProviderWrapper);
        },
        consume: Component => {
            return class ConsumerWrapper extends React.Component {
                render() {
                    return (
                        <Consumer>
                            {value => (
                                <Component
                                    {...this.props}
                                    {...{ [propKey]: value }}
                                />
                            )}
                        </Consumer>
                    );
                }
            };
        }
    };
};

export default contextHoc;
