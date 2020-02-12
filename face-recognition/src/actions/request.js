import {REQUEST_ERROR, REQUEST_ERROR_CLOSE, REQUEST_PENDING, REQUEST_SUCCESS} from 'constants/request';


export const requestPending = (name) => {
    return {
        type: REQUEST_PENDING,
        payload: {
            name
        }
    };
};

export const requestSuccess = (name) => {
    return {
        type: REQUEST_SUCCESS,
        payload: {
            name
        }
    };
};


export const requestError = (name, error, link) => {
    return {
        type: REQUEST_ERROR,
        payload: {
            name,
            error,
            link
        }
    };
};

export const requestErrorClose = () => {
    return {
        type: REQUEST_ERROR_CLOSE,
    };
};
