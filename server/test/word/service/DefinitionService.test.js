import sinon from 'sinon';
import { expect } from 'chai';
import * as stubs from 'word/stubs/stub';
import { definitionService } from 'definition/service/DefinitionService';
import { DefinitionModel } from 'definition/model/DefinitionModel';

describe('Definition Service', () => {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create();
    this._testData = { source: stubs.createStubWord() };
  });

  afterEach(function () {
    this.sandbox.restore();
  });

  describe('insert', () => {
    it('should handle success', function* () {
      const response = {};
      this.sandbox.stub(DefinitionModel, 'createDefinition', stubs.resolveWith(response));
      const spy = this.sandbox.spy();
      definitionService.on('definitionCreated', spy);
      const addDefinitionResponse = yield definitionService.addDefinition(this._testData.source);

      expect(addDefinitionResponse).to.equal(response);
      expect(spy.called).to.equal(true);
    });

    it('should handle failure', function* () {
      const error = {};
      this.sandbox.stub(DefinitionModel, 'createDefinition', stubs.rejectWith(error));
      const spy = this.sandbox.spy();
      definitionService.on('definitionCreated', spy);
      try {
        definitionService.addDefinition(this._testData.source);
      } catch (err) {
        expect(err).to.equal(error);
        expect(spy.called).to.equal(false);
      }
    });
  });
});
