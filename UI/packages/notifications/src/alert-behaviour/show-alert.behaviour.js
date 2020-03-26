const SHOW_ALERT = "SHOW_ALERT";

const showAlert = (alertType, text) => ({
    type: SHOW_ALERT,
    alertType,
    text
});

const reducers = {
    [SHOW_ALERT]: (state, action) => {
        return {
            ...state,
            messages: state.messages.concat([
                { type: action.alertType, text: action.text }
            ])
        };
    }
};

export { SHOW_ALERT, reducers };
export default showAlert;
