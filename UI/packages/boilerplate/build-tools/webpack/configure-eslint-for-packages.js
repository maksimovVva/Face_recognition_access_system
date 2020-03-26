function _addPackagesPathToEslint(
    config,
    env,
    { getEslintRule, appSrc, packagesSrc }
) {
    const esLintRule = getEslintRule(config);

    // console.log("eslint:");
    // console.log("were: ", esLintRule.include);
    esLintRule.include = [appSrc, packagesSrc];
    esLintRule.exclude = /node_modules/;
    // console.log("became: ", esLintRule.include);
    return config;
}

module.exports = _addPackagesPathToEslint;
