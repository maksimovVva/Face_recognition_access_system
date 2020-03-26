import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import "moment/locale/ru";

import React from "react";
import PropTypes from "prop-types";

import "./react-dates.css";

const language = "ru";

class DatetimePicker extends React.Component {
    static propTypes = {
        displayFormat: PropTypes.string,
        input: PropTypes.object,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null,
            date: props.date
        };
        this.isOutsideRange = this._isOutsideRange.bind(this);
        this.onDateChange = this._onDateChange.bind(this);
        this.onFocusChange = this._onFocusChange.bind(this);
    }

    _onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    _onDateChange(date) {
        const { onFieldChange, input: { onChange } = {} } = this.props;
        this.setState({ date: date, placeholder: "Выберите дату" });
        onChange && onChange(date);
        onFieldChange && onFieldChange(date);
    }

    _isOutsideRange(date) {
        const { startDate = null, endDate = null } = this.props;
        let momentStartDate = moment(startDate).startOf("day");
        let momentEndDate = moment(endDate).endOf("day");
        if (startDate && date && date < momentStartDate) {
            return true;
        } else if (endDate && date && date > momentEndDate) {
            return true;
        } else {
            return false;
        }
    }

    renderMonthElement({ month, onMonthSelect, onYearSelect }) {
        let startDate = moment().subtract("year", 30);
        let endDate = moment().add("year", 40);
        let years = [];

        while (startDate.isBefore(endDate)) {
            let date = startDate.add("year", 1).clone();
            years.push(date);
        }

        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                    <select
                        value={month.month()}
                        onChange={e => onMonthSelect(month, e.target.value)}
                    >
                        {moment.months().map((label, value) => (
                            <option value={value}>{label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        value={month.year()}
                        onChange={e => onYearSelect(month, e.target.value)}
                    >
                        {years.map(value => (
                            <option value={value.year()}>
                                {value.format("YYYY")}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }

    render() {
        const {
            id,
            label,
            maxWidth,
            placeholder,
            disabled,
            input: { value } = {},
            captionColumns = 2,
            className = "",
            labelClassName = ""
        } = this.props;

        // if (disabled && !value && !!this.state.date) {
        //     this.setState({ date: null });
        // }

        return (
            <div className={`form-group row ${className}`}>
                <label
                    htmlFor={id}
                    className={`col-md-${captionColumns} col-form-label ${labelClassName}`}
                >
                    {label}
                </label>
                <div
                    id={id}
                    style={{ width: maxWidth }}
                    className={`col-md-${12 - captionColumns}`}
                >
                    <SingleDatePicker
                        displayFormat={this.props.displayFormat}
                        date={this.state.date}
                        onDateChange={this.onDateChange}
                        focused={this.state.focused} // PropTypes.bool
                        onFocusChange={({ focused }) =>
                            this.setState({ focused })
                        } // PropTypes.func.isRequired
                        numberOfMonths={1}
                        isOutsideRange={this.isOutsideRange}
                        placeholder={placeholder}
                        disabled={disabled}
                        hideKeyboardShortcutsPanel={true}
                        showClearDate={true}
                        block={true}
                        calendarInfoPosition="top"
                        renderMonthElement={({ month }) =>
                            moment(month)
                                .locale(language)
                                .format("MMMM YYYY")
                        } // solution: https://github.com/airbnb/react-dates/issues/327#issuecomment-414840540
                    />
                </div>
            </div>
        );
    }
}

DatetimePicker.propTypes = {
    id: PropTypes.string.isRequired,
    onFieldChange: PropTypes.func.isRequired
};

export default DatetimePicker;
