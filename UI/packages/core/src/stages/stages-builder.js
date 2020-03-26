import { identity, mix, stub } from "utils";

const separator = "_";

const reduce = stages => reducer => Object.keys(stages).reduce(reducer, {});

const defaults = {
    behaviour: stages =>
        reduce(stages)((res, stage) => mix(res)({ [stage]: stub }))
};

const stageBuilder = stages => (key, stage) => {
    return key + separator + stages[stage];
};

const buildStageHandlers = stages => (key, args, resultMapping, behaviour) => {
    const buildStage = stageBuilder(stages);
    const reduceStages = reduce(stages);

    const customBehaviour = { ...defaults.behaviour(stages), ...behaviour };
    const mapping = {
        ...reduceStages((res, stage) => mix(res)({ [stage]: identity })),
        ...resultMapping
    };

    return next =>
        reduceStages((result, stageKey) => {
            const stage = buildStage(key, stageKey);
            const mapper = mapping[stageKey];
            const handler = response => {
                const mapped = mapper(response);
                const res = { ...args, ...mapped, response: mapped };
                next({ type: stage, ...res });
                customBehaviour[stageKey](res);
            };
            return { ...result, ...{ [stageKey]: handler } };
        });
};

export { buildStageHandlers, stageBuilder };
