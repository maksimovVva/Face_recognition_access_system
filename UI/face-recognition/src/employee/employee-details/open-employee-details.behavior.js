const OPEN_EMPLOYEE_DETAILS = "OPEN_EMPLOYEE_DETAILS";

const openEmployeeDetails = (employee) => ({
    type: OPEN_EMPLOYEE_DETAILS,
    employee
});

export const reducers = {
    OPEN_EMPLOYEE_DETAILS: (state, action) => {
        return {
            ...state,
            selectedEmployee: action.employee
        };
    }
};

export default openEmployeeDetails;
