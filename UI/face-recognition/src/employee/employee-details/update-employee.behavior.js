import { ASYNC_FETCH, failure, success } from "core";

const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";

const updateEmployeeRequest = employee => ({
    url: `/api/employees/${employee.id}`,
    options: {
        headers: {
            "content-type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
            name: employee.firstName
        })
    }
});

const updateEmployee = employee => {
    return {
        args: { employee },
        request: updateEmployeeRequest(employee),
        type: ASYNC_FETCH,
        id: UPDATE_EMPLOYEE
    };
};

const reducers = {
    [success(UPDATE_EMPLOYEE)]: (state, action) => {
        debugger
        return {
            ...state,
            items: state.items.map(item => action.employee.id !== item.id ? item : action.employee),
            selectedEmployee: null
        };
    }
};

const labels = {
    [failure(UPDATE_EMPLOYEE)]: res => {
        return res.error;
    }
};

export { reducers, labels };
export default updateEmployee;
