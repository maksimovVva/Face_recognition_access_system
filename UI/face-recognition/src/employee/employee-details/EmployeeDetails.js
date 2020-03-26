import React from "react";
import PropTypes from "prop-types";
import DateTimePicker from "react-datetime-picker";

import employeeType from "../employee.type";
import { AutoComplete, DatetimePicker } from "components";
import moment from "moment";

class EmployeeDetails extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this._onChange.bind(this);
         
        this.state = {
            ...this.props.employee,
            departments: this.props.departments,
            secures: this.props.secures
        };

        console.log(this.props);
        console.log(this.state);
    }

    get valid() {
        const { firstName } = this.state;

        return firstName && firstName.trim();
    }

    _onChange(changes) {
        this.setState(changes, this.props.onChange);
    }

    render() {
        const {
            name,
            firstName,
            lastName,
            middleName,
            birthdayDate,
            department,
            departments,
            securityLevels,
            secures,
            isTemprory,
            passDate,
            pngPath
        } = this.state;

        return (
            <React.Fragment>
                <div>
                   <img src={pngPath} width="100" height="100"/> 
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="nameInput"
                        className={`col-md-3 col-form-label`}
                    >
                        Имя
                    </label>
                    <input id="nameInput" value={firstName} onChange={v => this.onChange({firstName: v.target.value})} />
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="lastInput"
                        className={`col-md-3 col-form-label`}
                    >
                        Фамилия
                    </label>
                    <input id="lastInput" value={lastName} onChange={v => this.onChange({lastName: v.target.value})} />
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="middleInput"
                        className={`col-md-3 col-form-label`}
                    >
                        Отчество
                    </label>
                    <input id="middleInput" value={middleName} onChange={v => this.onChange({middleName: v.target.value})} />
                </div>
                <div>
                    <DatetimePicker label="Дата рождения" captionColumns={3} date={moment(birthdayDate)} onFieldChange={this.onChange} />
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="departmentInput"
                        className={`col-md-3 col-form-label`}
                    >
                        Отдел
                    </label>
                    {departments && (
                        <AutoComplete
                            id="departmentInput"
                            items={departments.map(s => ({id: s.Id, name: s.Name}))}
                            value={department != null ? [department] : []}
                            placeholder="Департамент"
                            labelKey="name"
                            size="100px"
                            multiple={false}
                            onChange={v => this.onChange({department: v != null ? v[0] : null})}
                        />
                    )}
                </div>
                <div  className="form-group row">
                    <label
                        htmlFor="secureInput"
                        className={`col-md-3 col-form-label`}
                    >
                        Уровень доступа
                    </label>
                    {secures && (
                        <AutoComplete
                            id="secureInput"
                            items={secures.map(s => ({id: s.Id, name: s.Name}))}
                            value={securityLevels}
                            placeholder="Уровень доступа"
                            labelKey="name"
                            multiple
                            onChange={v => this.onChange({securityLevels: v})}
                        />
                    )}
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="temproryInput"
                        className={`col-md-3 col-form-label`}
                    >
                        Временный пропуск
                    </label>
                    <input
                        id="temproryInput"
                        type={"checkbox"}
                        checked={isTemprory}
                        onChange={this.onChange}
                    />
                </div>
                {isTemprory && (
                    <div>
                        Время действия
                        <DateTimePicker
                            id={`${firstName}${lastName}`}
                            date={passDate}
                            onFieldChange={this.onChange}
                        />
                    </div>
                )}
            </React.Fragment>
        );
    }
}

EmployeeDetails.propTypes = {
    employee: PropTypes.shape(employeeType)
};

export default EmployeeDetails;
