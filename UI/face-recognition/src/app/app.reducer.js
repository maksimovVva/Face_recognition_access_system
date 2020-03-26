import { combineReducers } from "redux";

import { reducer as alerts } from "notifications";

import { reducer as employeesReducer } from "../employee";

import {reducer as selectPageReducer} from "./select-page.behavior";

export default combineReducers({
    notifications: combineReducers({
        alerts: alerts
    }),
    employees: employeesReducer,
    pages: selectPageReducer
});
