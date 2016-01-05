"use strict";
import sinon from "sinon";
import assert from "assert";
import { expect } from "chai";
import * as stubs from "../stubs/stub.js";
import { wordService } from "../../../src/word/servirce/WordService.js";
import { WordModel } from "../../../src/word/model/WordModel.js";

describe("Word Service", function () {
    beforeEach(function () {
        this.sandbox = sinon.sandbox.create();
        this.__testData = {source: stubs.createStubWord()};
    });

    afterEach(function () {
        this.sandbox.restore();
    });

    describe("insert", function () {

        it("should handle success", function (done) {
            let response = {};
            this.sandbox.stub(WordModel, "createWord", (obj) => {
                return new Promise((resolve, reject) => resolve(response));
            });
            let spy = this.sandbox.spy();
            wordService.on("wordCreated", spy);
            let addWordPromise = wordService.addWord(this.__testData.source);
            addWordPromise.then(data => {
                expect(data).to.equal(response);
                expect(spy.called).to.equal(true);
                done();
            });
        });

        it("should handle failure", function (done) {
            let error = {};
            this.sandbox.stub(WordModel, "createWord", (obj) => {
                return new Promise((resolve, reject) => reject(error));
            });
            let spy = this.sandbox.spy();
            wordService.on("wordCreated", spy);
            let addWordPromise = wordService.addWord(this.__testData.source);
            addWordPromise.catch(err => {
                expect(err).to.equal(error);
                expect(spy.called).to.equal(false);
                done();
            });
        });
    });
});