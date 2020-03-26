export const mergeReducers = (reducersByActionTypes, initialState) => (
    state = initialState,
    action
) => {
    if (!reducersByActionTypes) {
        throw new Error("Specify 'reducersByActionTypes' argument first.");
    }

    const reducer = reducersByActionTypes[action.type];

    if (!reducer) return state;

    return reducer(state, action);
};
