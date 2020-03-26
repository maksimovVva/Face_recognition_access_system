import { ASYNC_FETCH, begin, success, failure } from "core";

const FETCH_SECURITY_LEVELS = "FETCH_SECURITY_LEVELS";

const fetchSecurityLevelsRequest = () => ({
    url: `/api/securityLevels`,
    options: {
        headers: {
            "content-type": "application/json"
        },
        method: "GET"
    }
});

const fetchSecurityLevels = () => {
    return {
        request: fetchSecurityLevelsRequest(),
        type: ASYNC_FETCH,
        id: FETCH_SECURITY_LEVELS
    };
};

const reducers = {
    [begin(FETCH_SECURITY_LEVELS)]: (state, action) => {
        return {
            ...state,
            loading: true,
        };
    },
    [success(FETCH_SECURITY_LEVELS)]: (state, action) => {
        return {
            ...state,
            loading: false,
            securityLevels: action.response
        };
    }
};

const labels = {
    [failure(FETCH_SECURITY_LEVELS)]: res => {
        return res.error;
    }
};

export { reducers, labels };
export default fetchSecurityLevels;
