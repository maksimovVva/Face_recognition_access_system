function _getActionLabel(labels, action, { logging = true } = {}) {
    if (!labels) return null;

    try {
        const label = labels[action.type];
        return typeof label === "function" ? label(action) : label;
    } catch (err) {
        logging &&
            console.warn(
                `Could not get "${action.type}" in labelStorage. ${err.message}`
            );
    }
}

export default _getActionLabel;
