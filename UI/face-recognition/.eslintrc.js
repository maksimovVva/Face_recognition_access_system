module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "ecmaFeatures": {
        "jsx": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "eslint-plugin-react",
        "prefer-bind-operator"
    ],
    "rules": {
        "react/jsx-uses-vars": 1,
        "react/react-in-jsx-scope": 0,
        "prefer-bind-operator/prefer-bind-operator": 0,
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
