import { mix } from "utils";

import { stageBuilder, buildStageHandlers } from "./stages-builder";

const beginKey = "begin";
const successKey = "success";
const failureKey = "failure";

const stagesArray = [beginKey, successKey, failureKey];
const reduce = reducer => stagesArray.reduce(reducer, {});
const stagesHash = reduce((res, stage) => mix(res)({ [stage]: stage }));

const buildStage = stageBuilder(stagesHash);

const begin = key => buildStage(key, beginKey);
const success = key => buildStage(key, successKey);
const failure = key => buildStage(key, failureKey);

const isStage = (action, stage) => action.endsWith(stage);
const isBegin = action => isStage(action, beginKey);
const isSuccess = action => isStage(action, successKey);
const isFailure = action => isStage(action, failureKey);

export {
    stagesHash as keys,
    begin,
    success,
    failure,
    isBegin,
    isSuccess,
    isFailure
};

export default buildStageHandlers(stagesHash);
