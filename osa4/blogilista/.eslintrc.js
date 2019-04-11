module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": "airbnb",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
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
            "never"
        ],
        "eqeqeq": "error",
        "no-console": 0,
        "no-underscore-dangle": 0,
        "no-param-reassign": 0,
        "global-require": 0,
        "prefer-destructuring": 0,
        "import/order": 0,
        "consistent-return": 0,
        "no-unused-vars": 0
    }
};