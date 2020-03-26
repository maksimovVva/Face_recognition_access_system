const stub = () => {};

const identity = item => item;
const propertyIdentity = property => item =>
    item && item.hasOwnProperty(property) ? item[property] : "";
const firstElement = array => (array ? array.find(identity) : null);
const firstElementProperty = property => item =>
    propertyIdentity(property)(firstElement(item));
const idIdentity = propertyIdentity("id");
const idFilter = identifier => item => idIdentity(item) === identifier;

const reduceExecute = functions => args => {
    return functions.reduce((res, fn) => {
        return args ? fn(...args) : fn();
    }, stub);
};

const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (el, i) => i + start);

const mix = one => two => ({ ...one, ...two });
const merge = (target, source) =>
    Object.keys(source).reduce((res, key) => {
        res[key] = source[key];
        return res;
    }, target);

const sequence = function(fn) {
    if (!fn) return;

    const instance = function _executor() {
        if (arguments.length) {
            const notFunctions = [...arguments].filter(arg => {
                return typeof arg !== "function";
            });

            if (notFunctions.length) {
                return instance.reduce([...arguments]);
            }

            instance.functions.push(...arguments);

            return instance;
        }

        return instance.reduce();
    };

    instance.functions = [];
    instance.reduce = reduceExecute(instance.functions);

    return instance(...arguments);
};

export {
    identity,
    propertyIdentity,
    firstElement,
    firstElementProperty,
    idIdentity,
    idFilter,
    stub,
    sequence,
    range,
    mix,
    merge
};
