import { applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {hashHistory} from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import crosstabSync from 'redux-persist-crosstab';
import reducers from '../reducers';
import { asyncSessionStorage } from 'redux-persist/storages';
import { requestMiddleware } from 'middlewares';

export default function configureStore(initialState, callback) {

    const store = createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(requestMiddleware),
            applyMiddleware(thunkMiddleware), 
            applyMiddleware(routerMiddleware(hashHistory)),
            autoRehydrate(),
            // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
    const persister = persistStore(store, {whitelist:['*']}, function () {
        callback(store);
    });

    crosstabSync(persister);
}
