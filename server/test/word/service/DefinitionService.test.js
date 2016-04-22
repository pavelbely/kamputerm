'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _chai = require('chai');

var _stub = require('../stubs/stub.js');

var stubs = _interopRequireWildcard(_stub);

var _DefinitionService = require('../../../src/definition/servirce/DefinitionService.js');

var _DefinitionModel = require('../../../src/definition/model/DefinitionModel.js');

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

describe('Definition Service', function () {
    beforeEach(function () {
        this.sandbox = _sinon2.default.sandbox.create();
        this.__testData = { source: stubs.createStubWord() };
    });

    afterEach(function () {
        this.sandbox.restore();
    });

    describe('insert', function () {

        it('should handle success', _regenerator2.default.mark(function _callee() {
            var response, spy, addDefinitionResponse;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            response = {};

                            this.sandbox.stub(_DefinitionModel.DefinitionModel, 'createDefinition', stubs.resolveWith(response));
                            spy = this.sandbox.spy();

                            _DefinitionService.definitionService.on('definitionCreated', spy);
                            _context.next = 6;
                            return _DefinitionService.definitionService.addDefinition(this.__testData.source);

                        case 6:
                            addDefinitionResponse = _context.sent;

                            (0, _chai.expect)(addDefinitionResponse).to.equal(response);
                            (0, _chai.expect)(spy.called).to.equal(true);

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        it('should handle failure', _regenerator2.default.mark(function _callee2() {
            var error, spy;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            error = {};

                            this.sandbox.stub(_DefinitionModel.DefinitionModel, 'createDefinition', stubs.rejectWith(error));
                            spy = this.sandbox.spy();

                            _DefinitionService.definitionService.on('definitionCreated', spy);
                            try {
                                _DefinitionService.definitionService.addDefinition(this.__testData.source);
                            } catch (err) {
                                (0, _chai.expect)(err).to.equal(error);
                                (0, _chai.expect)(spy.called).to.equal(false);
                            }

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));
    });
});