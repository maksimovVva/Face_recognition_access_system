import React from "react";
import PropTypes from "prop-types";

import { Modal, ModalHeader, ModalFooter } from "reactstrap";
import { sequence, stub } from "utils";

class ConfirmationPopup extends React.Component {
    constructor(props) {
        super(props);


        this.state = { 
            opened: props.opened 
        };

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
        const { title, className, submitName, closeName, onlyClose = false } = this.props;

        return (
            <Modal
                isOpen={this.state.opened}
                toggle={this.close}
                className={className}
                centered
            >
                <ModalHeader toggle={this.close}>{title}</ModalHeader>
                {
                    !onlyClose &&
                    <ModalFooter>
                        <button
                            className="btn btn-sm btn-success"
                            onClick={this.submit}
                        >
                            {submitName ? submitName : "Да"}
                        </button>
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={this.close}
                        >
                            {closeName ? closeName : "Нет"}
                        </button>
                    </ModalFooter>
                }
                {
                    onlyClose && 
                    <ModalFooter>
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={this.close}
                        >
                            {closeName ? closeName : "Нет"}
                        </button>
                    </ModalFooter>
            }
            </Modal>
        )
    }
}

ConfirmationPopup.propTypes = {
    title: PropTypes.string.isRequired,
    submit: PropTypes.func,
    submitName: PropTypes.string,
    close: PropTypes.func,
    closeName: PropTypes.string,
    className: PropTypes.string
};

export default ConfirmationPopup;