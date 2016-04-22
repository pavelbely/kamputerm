'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.createStubWord = createStubWord;
exports.resolveWith = resolveWith;
exports.rejectWith = rejectWith;

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function createStubWord() {
    return {
        sources: [{ lang: 'eng', definition: ['scope'] }],
        translations: [{ spellings: [{ tarask: 'абшар' }] }],
        meta: {
            tags: ['programming', 'scripts']
        }
    };
}

function resolveWith(response) {
    return function (obj) {
        return new _promise2.default(function (resolve, reject) {
            return resolve(response);
        });
    };
}

function rejectWith(err) {
    return function (obj) {
        return new _promise2.default(function (resolve, reject) {
            return reject(err);
        });
    };
}