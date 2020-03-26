const path = require("path");

const configureEslint = require("./configure-eslint-for-packages");
const configureBabel = require("./configure-babel-for-packages");

const configurators = [configureEslint, configureBabel];

const packagesSrc = path.resolve(__dirname, "..", "..", "..", "..", "packages");

module.exports = args => (config, env) =>
    configurators.reduce(
        (res, next) => next(res, env, { ...args, packagesSrc }),
        config
    );
