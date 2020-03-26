const HIDE_ALERT = "HIDE_ALERT";

const hideAlert = text => ({
    type: HIDE_ALERT,
    text
});

const reducers = {
    [HIDE_ALERT]: (state, action) => {
        return {
            ...state,
            messages: state.messages.filter(m => m.text !== action.text)
        };
    }
};

export { HIDE_ALERT, reducers };
export default hideAlert;
