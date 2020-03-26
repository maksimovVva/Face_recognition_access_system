function buildStrictStorage() {
    const storage = {};

    return new Proxy(storage, {
        get: (target, property) => {
            if (!Reflect.has(target, property)) {
                throw new Error(`Label "${property}" is missing.`);
            }

            return Reflect.get(target, property);
        },
        set: (target, property, value) => {
            if (Reflect.has(target, property)) {
                throw new Error(`Label "${property}" already exists.`);
            }

            return Reflect.set(target, property, value);
        },
        has: function() {
            return false;
        },
        ownKeys: function() {
            return [];
        },
        getOwnPropertyDescriptor: function() {
            return false;
        }
    });
}

export default buildStrictStorage;
