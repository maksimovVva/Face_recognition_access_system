import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Popup, Overlay, Loader, ConfirmationPopup } from "components";

import EmployeeDetails from "./EmployeeDetails";
import employeeType from "../employee.type";

class EmployeeDetailsPopup extends React.Component {
    constructor(props) {
        super(props);

        this.close = this._close.bind(this);
        this.employeeCreationForm = React.createRef();
        this.submit = this._submit.bind(this);

        this.state = {
            canSubmit: false
        };
    }

    _close() {
        this.props.close();
    }

    _submit() {
        const employee = this.employeeCreationForm.current.state;
        if (this.props.isCreationMode) {
            this.props.createEmployee(employee);
        } else {
            this.props.updateEmployee(employee);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let canSubmit = this.employeeCreationForm.current
            ? this.employeeCreationForm.current.valid
            : false;
        if (prevState.canSubmit !== canSubmit) {
            this.setState({ canSubmit: canSubmit });
        }
    }

    render() {
        const {
            employee,
            opened,
            isCreationMode,
            securityLevels,
            departments
        } = this.props;

        return (
            <Popup
                className="modal-lg employee-type-details"
                opened={opened}
                title={
                    isCreationMode
                        ? "Добавить сотрудника"
                        : employee
                            ? `Редактирование сотрудника "${
                                employee.fullName
                              }"`
                            : "Поиск..."
                }
                submitName="Сохранить"
                closeName="Отмена"
                canSubmit={this.state.canSubmit}
                onClose={this.close}
                onSubmit={this.submit}
            >
                <EmployeeDetails
                    ref={this.employeeCreationForm}
                    onChange={() =>
                        this.setState({
                            canSubmit: this.employeeCreationForm.current.valid
                        })
                    }
                    isCreationMode={isCreationMode}
                    employee={employee}
                    departments={departments}
                    secures={securityLevels}
                />
            </Popup>
        );
    }
}

EmployeeDetailsPopup.propTypes = {
    employee: PropTypes.shape(employeeType)
};

export default EmployeeDetailsPopup;
