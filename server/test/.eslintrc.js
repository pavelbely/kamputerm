var path = require('path');

module.exports = {
  env: {
    node: true,
    mocha: true,
  },
  "rules": {
    "no-console": 'off',
    "func-names": 'off',
    "no-underscore-dangle": ["error",{ "allow": ["_id", "_testData"] }]
  },
};
