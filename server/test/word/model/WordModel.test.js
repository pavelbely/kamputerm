"use strict";

import { WordModel } from "../../../src/word/model/WordModel.js"
import assert from "assert";

describe('Word Model', function () {

    beforeEach(function () {
        this.source = {
            sources: [{id: "eng", value: "scope"}],
            spellings: [{id: "tarask", value: "абшар"}],
            meta: {
                tags: ["programming", "scripts"]
            }
        };
    });

    it("should validate correct object", function (done) {
        verify(this.source, done);
    });

    it("should fail with invalid tags", function (done) {
        this.source.meta.tags.push({});
        verify(this.source, done, false);
    });

    it("should fail with invalid sources", function (done) {
        this.source.sources.push({id: {}});
        verify(this.source, done, false);
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