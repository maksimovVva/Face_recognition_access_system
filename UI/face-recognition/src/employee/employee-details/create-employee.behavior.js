import { ASYNC_FETCH, failure, success } from "core";

const CREATE_EMPLOYEE = "CREATE_EMPLOYEE";

const createEmployeeRequest = employee => ({
    url: `/api/employees`,
    options: {
        headers: {
            "content-type": "multipart/form-data"
        },
        method: "POST",
        body: {
            firstName: employee.firstName,
            lastName: employee.lastName,
            middleName: employee.middleName,
            passDate: employee.isTemporary ? employee.passDate : null,
            birthdayDate: employee.birthdayDate,
            department: employee.department,
            securityLevel: employee.securityLevel,
            securityLevel: employee.securityLevel,
            isTemporary: employee.isTemporary
        }
    }
});

const createEmployee = employee => {
    return {
        args: { employee },
        request: createEmployeeRequest(employee),
        type: ASYNC_FETCH,
        id: CREATE_EMPLOYEE
    };
};

const reducers = {
    [success(CREATE_EMPLOYEE)]: state => {
        return {
            ...state,
            selectedEmployee: null
        };
    }
};

const labels = {
    [failure(CREATE_EMPLOYEE)]: res => {
        return res.error;
    }
};

export { reducers, labels };
export default createEmployee;
