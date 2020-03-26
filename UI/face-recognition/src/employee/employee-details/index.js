import createEmployee from "./create-employee.behavior";
import updateEmployee from "./update-employee.behavior";

import open from "./open-employee-details.behavior";
import close from "./close-employee-details.behavior";

const actions = {
    createEmployee,
    updateEmployee,

    open,
    close
};

export { actions };
export { default } from "./EmployeeDetailsPopup";
