import { stub } from "utils";

import assert from "../../../../tests/assert";

import { buildStageHandlers } from "./stages-builder";
import { keys } from "./async-stages";

it("stages creation", function() {
    const build = buildStageHandlers(keys);
    const stagesGetter = build("TEST_ACTION");
    const stages = stagesGetter(stub);

    assert.isFunction(stages.begin);
    assert.isFunction(stages.success);
    assert.isFunction(stages.failure);
});

it("exists begin-success-failure stages", function() {
    const args = { arg_a: "arg_a", arg_b: "arg_b" };
    const build = buildStageHandlers(keys);
    const behaviour = {
        begin: props => {
            assert.equals(props.arg_a, "arg_a");
            assert.equals(props.arg_b, "arg_b");
        }
    };
    const stagesGetter = build("TEST_ACTION", args, null, behaviour);

    const dispatch = ({ type, response, arg_a, arg_b }) => {
        assert.contains(type, [
            "TEST_ACTION_begin",
            "TEST_ACTION_success",
            "TEST_ACTION_failure"
        ]);
        assert.exists(response);
        assert.equals(response.text, "text");
        assert.equals(arg_a, "arg_a");
        assert.equals(arg_b, "arg_b");
    };

    const stages = stagesGetter(dispatch);

    stages.begin({ text: "text" });
    stages.success({ text: "text" });
    stages.failure({ text: "text" });
});
