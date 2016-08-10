var path = require('path');

module.exports = {
  env: {
    node: true,
    mocha: true,
  },
  "rules": {
    'no-unused-vars': ['error', { args: 'none' }],
    "no-console": 'off',
    "no-underscore-dangle": ["error",{ "allow": ["_id"] }]
  },
};
