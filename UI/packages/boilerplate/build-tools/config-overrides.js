const { getBabelLoader, loaderNameMatches } = require("react-app-rewired");

const override = require("./webpack/webpack-config-overrides");

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const eslintMatcher = rule => loaderNameMatches(rule, "eslint-loader");
const getLoaders = rule => (Array.isArray(rule.loader) && rule.loader) || [];
const getLoader = function(rules, matcher) {
    return rules.find(rule => {
        if (matcher(rule)) return rule;

        const internalRules = rule.use || rule.oneOf || getLoaders(rule);
        return getLoader(internalRules, matcher);
    });
};

const getters = {
    getBabelRule: config => getBabelLoader(config.module.rules),
    getEslintRule: config => getLoader(config.module.rules, eslintMatcher)
};

const smp = new SpeedMeasurePlugin();

module.exports = args => smp.wrap(override({ ...args, ...getters }));
