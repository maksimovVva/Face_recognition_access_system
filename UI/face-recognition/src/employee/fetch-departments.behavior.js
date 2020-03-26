import { ASYNC_FETCH, begin, success, failure } from "core";

const FETCH_DEPARTMENTS = "FETCH_DEPARTMENTS";

const fetchDepartmentsRequest = () => ({
    url: `/api/departments`,
    options: {
        headers: {
            "content-type": "application/json"
        },
        method: "GET"
    }
});

const fetchDepartments = () => {
    return {
        request: fetchDepartmentsRequest(),
        type: ASYNC_FETCH,
        id: FETCH_DEPARTMENTS
    };
};

const reducers = {
    [begin(FETCH_DEPARTMENTS)]: (state, action) => {
        return {
            ...state,
            loading: true,
        };
    },
    [success(FETCH_DEPARTMENTS)]: (state, action) => {
        return {
            ...state,
            loading: false,
            departments: action.response
        };
    }
};

const labels = {
    [failure(FETCH_DEPARTMENTS)]: res => {
        return res.error;
    }
};

export { reducers, labels };
export default fetchDepartments;
