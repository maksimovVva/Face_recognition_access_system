import { mergeReducers } from "core";
import { merge } from "utils";
import { labelStorage } from "boilerplate";

import {
    reducers as fetchEmployeesReducers,
    labels as fetchEmployeesLabels
} from "./fetch-employees.behavior";

import { reducers as fetchDepartmentsReducers } from "./fetch-departments.behavior";
import { reducers as fetchStatusesReducers } from "./fetch-statuses.behavior";
import { reducers as fetchSecurityLevelsReducers } from "./fetch-security-levels.behavior";
import { reducers as fetchCamerasReducers } from "./fetch-cameras.behavior";

import {
    reducers as createEmployeeReducers,
    labels as createEmployeeLabels
} from "./employee-details/create-employee.behavior";

import {
    reducers as updateEmployeeReducers,
    labels as updateEmployeeLabels
} from "./employee-details/update-employee.behavior";

import { reducers as openEmployeeDetailsReducers } from "./employee-details/open-employee-details.behavior";
import { reducers as closeEmployeeDetailsReducers } from "./employee-details/close-employee-details.behavior";
import {
    reducers as deleteEmployeeReducers,
    labels as deleteEmployeeLabels
} from "./delete-employee.behavior";

import { reducers as hubsReducers } from "./hubs.behavior";

const initialState = {
    items: [],
    selectedEmployee: null,
    departments: [],
    statuses: [],
    securityLevels: [],
    itemsCount: 0,
    takeCount: 20,
    lastTaken: undefined,
    hubConnection: null
};

merge(labelStorage, { ...fetchEmployeesLabels });
merge(labelStorage, { ...updateEmployeeLabels });
merge(labelStorage, { ...deleteEmployeeLabels });
merge(labelStorage, { ...createEmployeeLabels });

const reducer = mergeReducers(
    {
        ...fetchEmployeesReducers,
        ...fetchDepartmentsReducers,
        ...fetchStatusesReducers,
        ...fetchSecurityLevelsReducers,
        ...fetchCamerasReducers,

        ...updateEmployeeReducers,
        ...createEmployeeReducers,

        ...openEmployeeDetailsReducers,
        ...closeEmployeeDetailsReducers,
        ...deleteEmployeeReducers,

        ...hubsReducers
    },
    initialState
);

export { reducer };
export { default } from "./EmployeesPage";
