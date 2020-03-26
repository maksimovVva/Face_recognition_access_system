function cutAndFreeze(obj, prop) {
    const element = obj[prop];
    if (!element) {
        throw new Error(`${prop} must be specified.`);
    }

    const clone = { ...element };

    Reflect.deleteProperty(obj, prop);

    return deepFreeze(clone);
}

function deepFreeze(obj) {
    const propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach(function(name) {
        const prop = obj[name];
        if (typeof prop === "object" && prop !== null) deepFreeze(prop);
    });

    return Object.freeze(obj);
}

function humanizeNumber(value, textForms, options) {
    textForms.prefix = textForms.prefix || [];
    textForms.suffix = textForms.suffix || [];

    const cutValue = Math.abs(value) % 100;

    const rest = cutValue % 10;

    if (cutValue > 10 && cutValue < 20) {
        return buildTemplate(value, textForms, 2, options);
    }

    if (rest > 1 && rest < 5) {
        return buildTemplate(value, textForms, 1, options);
    }

    if (rest === 1) {
        return buildTemplate(value, textForms, 0, options);
    }

    return buildTemplate(value, textForms, 2, options);
}

function buildTemplate(value, textForms, form, options) {
    const cutOneOption = options && typeof options.cutOne !== "undefined";
    const cutOne = cutOneOption ? options.cutOne : true;
    const builtValue = (value !== 1 && value) || (cutOne ? "" : value);
    const prefix = textForms.prefix[form] || "";
    const suffix = textForms.suffix[form] || "";
    return `${prefix} ${builtValue} ${suffix}`;
}

function distinct(value, index, self) { 
    return self.indexOf(value) === index;
}

export { cutAndFreeze, humanizeNumber, distinct };