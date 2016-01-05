"use strict";

import assert from "assert";
import { DefinitionModel } from "../../../src/definition/model/DefinitionModel.js";
import * as stubs from "../stubs/stub.js";

describe("Definition Model", function () {

    beforeEach(function () {
        this._testData = {source : stubs.createStubWord()};
    });

    describe('validation', function () {
        it("should validate correct object", function (done) {
            verify(this._testData.source, done);
        });

        it("should fail with invalid tags", function (done) {
            this._testData.source.meta.tags.push({});
            verify(this._testData.source, done, false);
        });

        it("should fail with invalid sources", function (done) {
            this._testData.source.sources.push({lang: {}});
            verify(this._testData.source, done, false);
        });
    });
});

function verify(source, done, shouldFail = true) {
    let model = DefinitionModel.hydrate(source);
    model.validate(err => {
        if (!!err === shouldFail) {
            if (shouldFail) {
                assert.fail(err);
            } else {
                assert.fail("should fail");
            }
        } else {
            done();
        }
    });
}