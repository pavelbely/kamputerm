'use strict';
import sinon from 'sinon';
import assert from 'assert';
import { expect } from 'chai';
import * as stubs from '../stubs/stub.js';
import { definitionService } from '../../../src/definition/servirce/DefinitionService.js';
import { DefinitionModel } from '../../../src/definition/model/DefinitionModel.js';

describe('Definition Service', function () {
    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();
        this.__testData = {source: stubs.createStubWord()};
    });

    afterEach(function () {
        this.sandbox.restore();
    });

    describe('insert', function () {

        it('should handle success', function* () {
            let response = {};
            this.sandbox.stub(DefinitionModel, 'createDefinition', stubs.resolveWith(response));
            let spy = this.sandbox.spy();
            definitionService.on('definitionCreated', spy);
            let addDefinitionResponse = yield definitionService.addDefinition(this.__testData.source);

            expect(addDefinitionResponse).to.equal(response);
            expect(spy.called).to.equal(true);
        });

        it('should handle failure', function* () {
            let error = {};
            this.sandbox.stub(DefinitionModel, 'createDefinition', stubs.rejectWith(error));
            let spy = this.sandbox.spy();
            definitionService.on('definitionCreated', spy);
            try {
                definitionService.addDefinition(this.__testData.source);
            } catch(err) {
                expect(err).to.equal(error);
                expect(spy.called).to.equal(false);
            }
        });
    });
});