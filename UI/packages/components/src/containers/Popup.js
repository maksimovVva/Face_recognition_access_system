import React from "react";
import PropTypes from "prop-types";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Overlay, Loader } from "components";
import { sequence, stub } from "utils";

class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = { opened: props.opened, canSubmit: props.canSubmit };

        const toggle = opened => this.setState({ opened });
        const close = () => toggle(false);

        this.open = () => toggle(true);
        this.close = sequence(props.onClose)(close);
        this.submit =
            props.onSubmit &&
            sequence(props.onSubmit)(
                props.onCloseWhenSubmit ? this.close : stub
            );
    }

    static defaultProps = {
        opened: false,
        canSubmit: false,
        onClose: stub,
        onCloseWhenSubmit: true
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            typeof nextProps.opened !== "undefined" &&
            nextProps.opened !== prevState.opened
        ) {
            return { opened: nextProps.opened };
        }

        if (
            typeof nextProps.canSubmit !== "undefined" &&
            nextProps.canSubmit !== prevState.canSubmit
        ) {
            return { canSubmit: nextProps.canSubmit };
        }

        return null;
    }

    render() {
        const { title, className, submitName, closeName, loading } = this.props;

        return (
            <Modal
                isOpen={this.state.opened}
                toggle={this.close}
                className={className}
                centered
            >
                {
                    loading && (
                        <div className="popup-overlay-wrapper">
                            <Overlay>
                                <Loader
                                    type="Puff"
                                    color="#000000"
                                    height="130"
                                    width="130"
                                />
                            </Overlay>
                        </div>
                    )
                }
                <ModalHeader toggle={this.close}>{title}</ModalHeader>
                <ModalBody>
                    {this.state.opened && this.props.children}
                </ModalBody>
                <ModalFooter>
                    {this.submit && (
                        <button
                            className={`btn btn-sm ${
                                this.state.canSubmit ? "btn-success" : ""
                            }`}
                            onClick={this.submit}
                            disabled={!this.state.canSubmit}
                        >
                            {submitName ? submitName : "Сохранить"}
                        </button>
                    )}
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={this.close}
                    >
                        {closeName ? closeName : "Закрыть"}
                    </button>
                </ModalFooter>
            </Modal>
        );
    }
}

Popup.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
    ]),
    title: PropTypes.string.isRequired,
    submit: PropTypes.func,
    submitName: PropTypes.string,
    close: PropTypes.func,
    closeName: PropTypes.string,
    className: PropTypes.string,
};

export default Popup;
