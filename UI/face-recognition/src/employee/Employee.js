import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { ConfirmationPopup } from "components";
import moment from "moment";

import EmployeeType from "./employee.type";

class Employee extends React.Component {
    constructor(props) {
        super(props);

        this.openDetails = this._openDetails.bind(this);
        this.openDeleteModal = this._openDeleteModal.bind(this);
        this.closeDeleteModal = this._closeDeleteModal.bind(this);

        this.state = {
            openDeleteModal: false
        };
    }

    _openDeleteModal() {
        this.setState({ openDeleteModal: true });
    }

    _closeDeleteModal() {
        this.setState({ openDeleteModal: false });
    }

    _openDetails() {
         
        this.props.openDetails(this.props.item);
    }

    render() {
        const { id, firstName, lastName, middleName, department, status, securityLevels, passDate } = this.props.item;
        const { openDeleteModal } = this.state;

         
        return (
            <div className={`employee-row color-${id%2} row`} key={id}>
                <div className="col-md-3 employee-name mr-auto">
                    {`${lastName} ${firstName} ${middleName}`}
                </div>
                <div className="col-md-2 mr-auto">
                    {department.name}
                </div>
                <div className="col-md-2 mr-auto">
                   {status.name}
                </div>
                <div className="col-md-2 mr-auto">
                   {passDate}
                </div>
                <div className="col-md-1 mr-auto">
                   {securityLevels.map(s => s.name).join(",")}
                </div>
                <div className="col-md-2 mr-auto">
                    <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={this.openDetails}
                    >
                        &#9998;
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => this.openDeleteModal()}
                    >
                        &#10006;
                    </button>
                </div>
                <ConfirmationPopup
                    className="modal-lg"
                    opened={openDeleteModal}
                    title={`Вы действительно хотите удалить сотрудника "${lastName} ${firstName} ${middleName}"`}
                    onClose={this.closeDeleteModal}
                    onSubmit={() => this.props.delete(this.props.item.id)}
                />
            </div>
        );
    }
}

Employee.propTypes = {
    item: PropTypes.shape(EmployeeType)
};

export default withRouter(Employee);
