import { ASYNC_FETCH, success, failure } from "core";

const  DELETE_EMPLOYEE = " DELETE_EMPLOYEE";

const deleteEmployeeRequest = id => ({
    url: `/api/employees/${id}`,
    options: {
        headers: {
            "content-type": "application/json"
        },
        method: "DELETE"
    }
});

const deleteEmployee = id => {
    return {
        args: { employeeId: id },
        request: deleteEmployeeRequest(id),
        type: ASYNC_FETCH,
        id:  DELETE_EMPLOYEE
    };
};

const reducers = {
    [success( DELETE_EMPLOYEE)]: (state, action) => {
        return {
            ...state,
            items: state.items.filter(item => item.id !== action.employeeId)
        };
    }
};

const labels = {
    [failure( DELETE_EMPLOYEE)]: res => {
        return res.error;
    }
};

export { reducers, labels };
export default deleteEmployee;
