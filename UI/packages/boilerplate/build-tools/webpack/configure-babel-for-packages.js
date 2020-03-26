function _addPackagesToBabel(
    config,
    env,
    { getBabelRule, appSrc, packagesSrc }
) {
    const babelRule = getBabelRule(config);

    // console.log("were: ", babelRule);
    babelRule.include = [appSrc, packagesSrc];
    babelRule.exclude = /node_modules/;
    // console.log("became: ", babelRule);

    return config;
}

module.exports = _addPackagesToBabel;
