import { ASYNC_FETCH, begin, success, failure } from "core";

const FETCH_STATUSES = "FETCH_STATUSES";

const fetchStatusesRequest = () => ({
    url: `/api/status`,
    options: {
        headers: {
            "content-type": "application/json"
        },
        method: "GET"
    }
});

const fetchStatuses = () => {
    return {
        request: fetchStatusesRequest(),
        type: ASYNC_FETCH,
        id: FETCH_STATUSES
    };
};

const reducers = {
    [begin(FETCH_STATUSES)]: (state, action) => {
        return {
            ...state,
            loading: true,
        };
    },
    [success(FETCH_STATUSES)]: (state, action) => {
        return {
            ...state,
            loading: false,
            statuses: action.response
        };
    }
};

const labels = {
    [failure(FETCH_STATUSES)]: res => {
        return res.error;
    }
};

export { reducers, labels };
export default fetchStatuses;
