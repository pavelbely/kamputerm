var path = require('path');

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  extends: 'airbnb',
  settings: {
    'no-unused-vars': ['error', { args: 'none' }],
    'import/resolver': {
      node: {
        paths: [
          'node_modules',
          'client/src',
          'server/src',
          'server/test',
        ],
      },
    },
  },
  "plugins": [
    "mocha"
  ],
  ignorePath: '.eslintignore'
};
