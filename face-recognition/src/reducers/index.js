import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';


export const appReducer = combineReducers({
    form: formReducer,
    routing: routerReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
