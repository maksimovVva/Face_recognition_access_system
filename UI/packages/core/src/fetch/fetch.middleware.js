import buildAsyncStages from "../stages/async-stages";
import { handleFetchError } from "../errors";

const ASYNC_FETCH = "ASYNC_FETCH";

const baseRequestOptions = { credentials: "same-origin" };

const filenameStarRegex = new RegExp('filename\\*?=([^;\\s]*)', 'g');

const fetchMiddleware = fetchImplementation => store => next => action => {
    // console.log("fetchMiddleware: ", action.type);

    next(action);

    if (action.type !== ASYNC_FETCH) return;

    const responseDescription = action.response || {};
    const customMappings = responseDescription.mappings || {};
    const mappings = {
        failure: res => ({ error: res && res.message }),
        ...customMappings
    };
    const stageBuilderArgs = [action.id, action.args, mappings];
    const stages = buildAsyncStages(...stageBuilderArgs)(store.dispatch);

    const requestDescription = action.request;
    const fetchRequest = new Request(requestDescription.url, {
        ...baseRequestOptions,
        ...requestDescription.options
    });
    const responseType = requestDescription.options.responseType || 'json';
    stages.begin();
    
    return fetchImplementation(fetchRequest)
        .then(handleFetchError)
        .then(res => {
            if(res.status === 200) {
                if(responseType === 'blob') {
                    const disposition = res.headers.get('content-disposition');
                    const matches = disposition.match(filenameStarRegex);
                    if (matches != null) {
                        const match = (matches[1] || matches[0])
                            .replace("filename*=utf-8''", '')
                            .replace("filename=", '');
                        const filename = decodeURIComponent(match);
                        const blob = res.blob();
                        return { blob: blob, fileName: filename };
                    }
                }
                if(responseType === 'json')
                    return res.json();
            }
            else
                return res.text;
        })
        .then(res => stages.success(res))
        .catch(error => stages.failure(error));
};

export { ASYNC_FETCH };
export default fetchMiddleware;
