import { ASYNC_FETCH, begin, success, failure } from "core";

const FETCH_CAMERAS = "FETCH_CAMERAS";

const fetchCamerasRequest = () => ({
    url: `/api/cameras`,
    options: {
        headers: {
            "content-type": "application/json"
        },
        method: "GET"
    }
});

const fetchCameras = () => {
    return {
        request: fetchCamerasRequest(),
        type: ASYNC_FETCH,
        id: FETCH_CAMERAS
    };
};

const reducers = {
    [begin(FETCH_CAMERAS)]: (state, action) => {
        return {
            ...state,
            loading: true,
        };
    },
    [success(FETCH_CAMERAS)]: (state, action) => {
        return {
            ...state,
            loading: false,
            cameras: action.response
        };
    }
};

const labels = {
    [failure(FETCH_CAMERAS)]: res => {
        return res.error;
    }
};

export { reducers, labels };
export default fetchCameras;
