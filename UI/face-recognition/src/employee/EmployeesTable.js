import React from "react";
import { DataContainer, VirtualList } from "components";
import Employee from "./Employee";

class EmployeesTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.loadItems = this._loadItems.bind(this);
    }

    _loadItems() {
        this.props.loadEmployees();
    }

    render() {
        const {
            userActions,
            ...restProps
        } = this.props;

        return (
            <div className="table">
                <div className="table-header row">
                    <div className="col-md-3 m-auto">ФИО</div>
                    <div className="col-md-2 m-auto">Отдел</div>
                    <div className="col-md-2 m-auto">Статус</div>
                    <div className="col-md-2 m-auto">Окончание доступа</div>
                    <div className="col-md-1 m-auto">Уровень доступа</div>
                    <div className="col-md-2 m-auto">Действия</div>
                </div>
                <DataContainer
                    ItemsView={VirtualList}
                    ItemView={Employee}
                    itemProps={{
                        ...userActions,
                        key: item => item.id
                    }}
                    loadItems={this.loadItems}
                    {...restProps}
                />
            </div>
        );
    }
}

EmployeesTable.propTypes = {};

export default EmployeesTable;
