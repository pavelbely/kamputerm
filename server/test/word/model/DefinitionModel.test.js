'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _chai = require('chai');

var _coMocha = require('co-mocha');

var _coMocha2 = _interopRequireDefault(_coMocha);

var _DefinitionModel = require('../../../src/definition/model/DefinitionModel.js');

var _stub = require('../stubs/stub.js');

var stubs = _interopRequireWildcard(_stub);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

describe('Definition Model', function () {

    beforeEach(function () {
        this._testData = { source: stubs.createStubWord() };
    });

    describe('validation', function () {
        it('should validate correct object', _regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _DefinitionModel.DefinitionModel.checkValidity(this._testData.source);

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        it('should fail with invalid tags', _regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;

                            this._testData.source.meta.tags.push({});
                            _context2.next = 4;
                            return _DefinitionModel.DefinitionModel.checkValidity(this._testData.source);

                        case 4:
                            _assert2.default.fail('should fail');
                            _context2.next = 11;
                            break;

                        case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2['catch'](0);

                            (0, _chai.expect)(_context2.t0.errors).to.have.property('meta.tags');
                            (0, _chai.expect)(_context2.t0.name).to.equal('ValidationError');

                        case 11:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[0, 7]]);
        }));

        it('should fail with invalid sources', _regenerator2.default.mark(function _callee3() {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;

                            this._testData.source.sources.push({ lang: {} });
                            _context3.next = 4;
                            return _DefinitionModel.DefinitionModel.checkValidity(this._testData.source);

                        case 4:
                            _assert2.default.fail('should fail');
                            _context3.next = 11;
                            break;

                        case 7:
                            _context3.prev = 7;
                            _context3.t0 = _context3['catch'](0);

                            (0, _chai.expect)(_context3.t0.errors).to.have.property('sources.1.lang');
                            (0, _chai.expect)(_context3.t0.name).to.equal('ValidationError');

                        case 11:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this, [[0, 7]]);
        }));
    });
});