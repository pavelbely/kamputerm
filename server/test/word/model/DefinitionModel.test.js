'use strict';

import assert from 'assert';
import {expect} from 'chai';
import coMocha from 'co-mocha';
import { DefinitionModel } from '../../../src/definition/model/DefinitionModel.js';
import * as stubs from '../stubs/stub.js';

describe('Definition Model', function () {

    beforeEach(function () {
        this._testData = {source: stubs.createStubWord()};
    });

    describe('validation', function () {
        it('should validate correct object', function* () {
            yield DefinitionModel.checkValidity(this._testData.source);
        });

        it('should fail with invalid tags', function* () {
            try {
                this._testData.source.meta.tags.push({});
                yield DefinitionModel.checkValidity(this._testData.source);
                assert.fail('should fail');
            } catch (err) {
                expect(err.errors).to.have.property('meta.tags');
                expect(err.name).to.equal('ValidationError');
            }
        });

        it('should fail with invalid sources', function* () {
            try {
                this._testData.source.sources.push({lang: {}});
                yield DefinitionModel.checkValidity(this._testData.source);
                assert.fail('should fail');
            } catch (err) {
                expect(err.errors).to.have.property('sources.1.lang');
                expect(err.name).to.equal('ValidationError');
            }
        });
    });
});
