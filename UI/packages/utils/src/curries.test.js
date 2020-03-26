import assert from "../../../tests/assert";
import { merge, sequence } from "./curries";

it("sequence with no function", function() {
    assert.doesNotThrow(() => sequence());
});

it("sequence with one function", function() {
    let check = false;
    const fn = sequence(() => (check = true));

    assert.isFunction(fn);
    fn();
    assert.equals(check, true);
});

it("sequence with two functions", function() {
    let check = 0;

    const func1 = () => (check = 1);
    const func2 = () => (check = 5);

    const fn = sequence(func1)(func2);

    assert.isFunction(fn);
    fn();
    assert.equals(check, 5);
});

it("sequence with three functions", function() {
    let check = 0;

    const func1 = () => (check = 1);
    const func2 = () => (check = 5);
    const func3 = () => (check = 9);

    const fn = sequence(func1)(func2)(func3);

    assert.isFunction(fn);
    fn();
    assert.equals(check, 9);
});

it("sequence with three functions. adding one, then two together", function() {
    let check = 0;

    const func1 = () => (check = 1);
    const func2 = () => (check = 5);
    const func3 = () => (check = 9);

    const fn = sequence(func1)(func2, func3);

    assert.isFunction(fn);
    fn();
    assert.equals(check, 9);
});

it("sequence with three functions. adding three together", function() {
    let check = 0;

    const func1 = () => (check = 1);
    const func2 = () => (check = 5);
    const func3 = () => (check = 9);

    const fn = sequence(func1, func2, func3);

    assert.isFunction(fn);
    fn();
    assert.equals(check, 9);
});

it("sequence with three functions. adding three together. with an object argument at the call time", function() {
    let check = 0;

    const func1 = () => (check = 1);
    const func2 = () => (check = 5);
    const func3 = () => (check = 9);

    const fn = sequence(func1, func2, func3);

    assert.isFunction(fn);
    fn({});
    assert.equals(check, 9);
});

it("sequence with three functions. adding three together. with an object and a function arguments at the call time", function() {
    let check = 0;

    const func1 = () => (check = 1);
    const func2 = () => (check = 5);
    const func3 = () => (check = 9);
    const func4 = () => (check = "!!!");

    const fn = sequence(func1, func2, func3);

    assert.isFunction(fn);
    fn({}, func4);
    assert.equals(check, 9);
});

it("merge tests", function() {
    const target = { us: "Hello" };
    const source = { es: "Hola" };

    const res = merge(target, source);

    assert.equals(res.es, "Hola");
    assert.equals(res.us, "Hello");
});
