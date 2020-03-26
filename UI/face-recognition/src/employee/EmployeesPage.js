import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import EmployeeDetailsPopup from "./employee-details/EmployeeDetailsPopup";
import EmployeesTable from "./EmployeesTable";

import fetchEmployeesAction from "./fetch-employees.behavior";
import fetchDepartmentsAction from "./fetch-departments.behavior";
import fetchStatusesAction from "./fetch-statuses.behavior";
import fetchSecurityLevelsAction from "./fetch-security-levels.behavior";
import fetchCamerasAction from "./fetch-cameras.behavior";

import deleteEmployeeAction from "./delete-employee.behavior";

import { actions as popupActions } from "./employee-details";

import employeeType from "./employee.type";

class EmployeesPage extends React.Component {
    static defaults = {
        isFirstLoad: true
    };

    constructor(props) {
        super(props);

        this.state = EmployeesPage.defaults;

        this.loadEmployees = this.loadEmployees.bind(this);
        this.updateEmployeesTable = this.updateEmployeesTable.bind(this);
        props.fetchDepartments();
        props.fetchStatuses();
        props.fetchSecurityLevels();
        // props.fetchCameras();
    }

    render() {
        const {
            popupActions,
            userActions,
            selectedEmployee,
            popup,
            history,
            editing,
            securityLevels,
            statuses,
            departments,
            ...restProps
        } = this.props;
        return (
            <div className="col-md-12 page">
                <div className="row header-area">
                    {/* <h2 className="page-header">Сотрудники</h2> */}
                </div>
                <EmployeesTable
                    loadItems={() =>
                        this.loadEmployees({
                            take: this.props.takeCount,
                            lastTaken: this.props.lastTaken,
                        })
                    }
                    userActions={userActions}
                    {...restProps}
                    {...popupActions}

                />
                <EmployeeDetailsPopup
                    opened={!!selectedEmployee}
                    employee={selectedEmployee}
                    isCreationMode={!(selectedEmployee && selectedEmployee.id)}
                    securityLevels={securityLevels}
                    departments={departments}
                    {...popupActions}
                />
            </div>
        );
    }

    loadEmployees(args) {
        const action = this.props.fetchEmployees({
            reset: this.state.isFirstLoad,
            ...this.state,
            ...args
        });
        this.state.isFirstLoad && this.setState({ isFirstLoad: false });
        return action;
    }

    updateEmployeesTable = () => {
        this.setState(EmployeesPage.defaults, this.loadEmployeess);
    };
}

EmployeesPage.propTypes = {};

const mapStateToProps = state => {
    return {
        ...state.employees
    };
};

const mapDispatchToProps = dispatch => {
    const listActionCreators = {
        fetchEmployees: fetchEmployeesAction,
        fetchDepartments: fetchDepartmentsAction,
        fetchStatuses: fetchStatusesAction,
        fetchSecurityLevels: fetchSecurityLevelsAction,
        fetchCameras: fetchCamerasAction
    };

    const popupActionCreators = {
        open: popupActions.open,
        close: popupActions.close,
        createEmployee: popupActions.createEmployee,
        updateEmployee: popupActions.updateEmployee
    };

    const userActionCreators = {
        delete: deleteEmployeeAction,
        openDetails: popupActionCreators.open
    };

    return {
        popupActions: bindActionCreators(popupActionCreators, dispatch),
        userActions: bindActionCreators(userActionCreators, dispatch),
        ...bindActionCreators(listActionCreators, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeesPage);
