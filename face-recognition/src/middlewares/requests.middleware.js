import {replace} from 'react-router-redux';

import {requestPending, requestSuccess, requestError} from 'actions/request';

const getId = (name, getState) => {
    return (getState().requests[name] || {id: NaN}).id;
};

const callHook = (hook, next, ...params) => {
    if (typeof hook === 'function') {
        next(hook(...params));
    }
};

const getToken = (getState) => {
    return (getState().token || '');
};

export default store => next => action => {
    if (typeof action.hooks === 'undefined'
        || typeof action.requestParams === 'undefined'
        || typeof action.requestName === 'undefined') {
        next(action);
        return;
    }
    const [pendingHook, completeHook, errorHook] = action.hooks;
    const {url, data, dataType, method, redirect, responseType = 'json'} = action.requestParams;
    const {getState} = store;
    const name = action.requestName;
    let _url = url;

    let config = {
        method: method,
        credentials: 'same-origin'
    };

    if (method === 'post' || method === 'put' || method === 'delete') {
        if (dataType === 'file') {
            const formData = new FormData();
            for (let key in data) {
                if (data.hasOwnProperty(key) && data[key]) {
                    formData.append(key, data[key]);
                }
            }
            config.body = formData;
        }

        if (dataType === 'json') {
            config.body = JSON.stringify(data);
            config.headers = {
                'Content-Type': 'application/json; charset=utf-8'
            };
        }

        if (dataType === 'form') {
            config.body = data;
        }

        if (dataType === 'blob') {
            config.body = JSON.stringify(data);
            config.headers = {
                'Content-Type': 'application/json'
            };
        }

    }
    if (method === 'get') {
        if (data && Object.keys(data).length) {
            _url += '?' + Object.keys(data).map((key) => {
                return `${key}=${data[key]}`;
            }).join('&');
        }
    }
    next(requestPending(name));
    callHook(pendingHook, next);
    let id = getId(name, getState);
    let token = getToken(getState);
    const promise = new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(method.toUpperCase(), _url, true);
        if (dataType === 'blob') {
            xhr.responseType = 'blob';
        }
        if (config.headers) {
            xhr.setRequestHeader('Content-Type', config.headers['Content-Type']);
        }
        xhr.setRequestHeader('RequestVerificationToken', token);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status === 200) {
                if (responseType === 'json') {
                    let json = JSON.parse(xhr.responseText);
                    if (id === getId(name, getState)) {
                        resolve(json);
                    } else {
                    }
                } else if (responseType === 'blob') {
                    let receivedData = {
                        response: xhr.response,
                        contentDisposition: xhr.getResponseHeader('content-disposition')
                    };
                    resolve(receivedData);
                }
            } else if (xhr.status === 400) {
                if (responseType === 'blob') {
                    let blob = new Blob([xhr.response], {type: xhr.response.type}),
                        reader = new FileReader(),
                        json;
                    reader.onload = function (file) {
                        json = JSON.parse(file.target.result);
                        reject(json.message || json.errors, json.link);
                    };
                    reader.readAsText(blob);
                } else {
                    let json = JSON.parse(xhr.responseText);
                    reject(json.message || json.errors, json.link);
                }
            } else if (xhr.status > 401 && xhr.status !== 404 && xhr.status < 600) {
                reject(xhr.statusText);
            } else {
                reject(xhr.statusText);
            }
        };

        xhr.onerror = () => {
            reject(response.statusText);
        };
        xhr.send(config.body);
    });

    promise.then(
        (data) => {
            next(requestSuccess(name));
            callHook(completeHook, next, data);
            if (redirect) {
                next(replace(redirect));
            }
        },
        (error, link) => {
            console.error('request middleware', error);
            next(requestError(name, error, link));
            callHook(errorHook, next, error);
        }
    );
    next(action);
};