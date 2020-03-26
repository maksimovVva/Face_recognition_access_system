const CLOSE_EMPLOYEE_DETAILS = "CLOSE_EMPLOYEE_DETAILS";

const closeEmployeeDetails = () => {
    return {
        type: CLOSE_EMPLOYEE_DETAILS
    };
};

const reducers = {
    [CLOSE_EMPLOYEE_DETAILS]: state => {
        return {
            ...state,
            selectedEmployee: null
        };
    }
};

export { reducers };
export default closeEmployeeDetails;
