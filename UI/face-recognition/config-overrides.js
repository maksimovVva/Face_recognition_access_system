const path = require("path");

const configOverrides = require("../packages/boilerplate/build-tools/config-overrides");

const args = {
    appSrc: path.resolve(__dirname, "src")
};

module.exports = configOverrides(args);
