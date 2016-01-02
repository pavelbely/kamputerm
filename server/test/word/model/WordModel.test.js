"use strict";

import assert from "assert";
import { WordModel } from "../../../src/word/model/WordModel.js";
import * as stubs from "../stubs/stub.js";

describe("Word Model", function () {

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
            this._testData.source.sources.push({id: {}});
            verify(this._testData.source, done, false);
        });
    });
});

function verify(source, done, shouldFail = true) {
    let model = WordModel.hydrate(source);
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