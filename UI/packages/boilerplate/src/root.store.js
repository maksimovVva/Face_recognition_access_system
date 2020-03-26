import { createStore, applyMiddleware, compose } from "redux";

function build(initialState, reducer, middlewares) {
    const composeEnhancers =
        typeof window === "object" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;

    const allMiddlewares = [...middlewares];

    if (process.env.NODE_ENV !== "production") {
        allMiddlewares.push(_buildLogger());
    }

    const store = createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(...allMiddlewares))
    );

    // todo: configure hot-reload
    // if (module.hot) {
    //     module.hot.accept("./app.reducer", () => {
    //         const nextRootReducer = require("../../../risks-management/src/app/app.reducer")
    //             .default;
    //         store.replaceReducer(nextRootReducer);
    //     });
    // }

    return store;
}

function _buildLogger() {
    const { createLogger } = require("redux-logger");

    return createLogger({
        collapsed: true,
        diff: true,
        duration: true,
        actionTransformer: action => {
            // used instead of titleFormatter to preserve title colors due to https://github.com/evgenyrodionov/redux-logger/pull/216
            return {
                ...action,
                type: action.type + (action.id ? `: ${action.id}` : "")
            };
        }
    });
}

export { build };
