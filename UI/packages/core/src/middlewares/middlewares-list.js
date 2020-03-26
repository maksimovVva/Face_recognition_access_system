const middlewares = [];

const add = middleware => middlewares.push(middleware);
const iterator = () => middlewares[Symbol.iterator]();
const sequence = store => done => {
    const middlewareIterator = iterator();
    const middlewareGetter = () => {
        const middleware = middlewareIterator.next().value;
        return middleware && middleware(store);
    };
    return buildExecutor(middlewareGetter(), middlewareGetter, done);
};

const buildExecutor = (current, getter, done) => {
    if (!current) return done;

    const next = getter();
    return current(buildExecutor(next, getter, done));
};

export default { add, sequence };
