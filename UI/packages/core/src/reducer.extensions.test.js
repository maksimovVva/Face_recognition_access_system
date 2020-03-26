import { mergeReducers } from "./reducer.extensions";

it("should throws an error when 'reducers' argument is not defined", function() {
    const reducer = mergeReducers();

    expect(() => reducer({}, { type: "TEST" })).toThrow("'reducers' argument");
});

it("should correctly build a reducer", function() {
    const reducer = mergeReducers({
        TEST: () => {
            return { test: true };
        }
    });

    expect(reducer({}, { type: "TEST" })).toEqual({ test: true });
});

it("should handle all custom reducers", function() {
    const reducer = mergeReducers({
        TEST1: () => ({ test: "1" }),
        TEST2: () => ({ test: "2" }),
        TEST3: () => ({ test: "3" })
    });

    expect(reducer({}, { type: "TEST1" })).toEqual({ test: "1" });
    expect(reducer({}, { type: "TEST2" })).toEqual({ test: "2" });
    expect(reducer({}, { type: "TEST3" })).toEqual({ test: "3" });
});

it("should handle default value as provided state", function() {
    const reducer = mergeReducers({
        TEST1: () => ({ test: "1" }),
        TEST2: () => ({ test: "2" }),
        TEST3: () => ({ test: "3" })
    });

    expect(reducer({ test: "part of state" }, { type: "TEST" })).toEqual({
        test: "part of state"
    });
});

it("should return initial state when state is not defined", function() {
    const reducer = mergeReducers(
        {
            TEST1: () => ({ test: "1" }),
            TEST2: () => ({ test: "2" }),
            TEST3: () => ({ test: "3" })
        },
        { initial: true }
    );

    expect(reducer(undefined, { type: "TEST" })).toEqual({ initial: true });
});

it("should not return initial state when state is specified", function() {
    const reducer = mergeReducers(
        {
            TEST1: () => ({ test: "1" }),
            TEST2: () => ({ test: "2" }),
            TEST3: () => ({ test: "3" })
        },
        { initial: true }
    );

    expect(reducer({}, { type: "TEST" })).not.toEqual({ initial: true });
});
