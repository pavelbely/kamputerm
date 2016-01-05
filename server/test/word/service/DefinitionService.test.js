"use strict";
import sinon from "sinon";
import assert from "assert";
import { expect } from "chai";
import * as stubs from "../stubs/stub.js";
import { definitionService } from "../../../src/definition/servirce/DefinitionService.js";
import { DefinitionModel } from "../../../src/definition/model/DefinitionModel.js";

describe("Definition Service", function () {
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
            this.sandbox.stub(DefinitionModel, "createDefinition", (obj) => {
                return new Promise((resolve, reject) => resolve(response));
            });
            let spy = this.sandbox.spy();
            definitionService.on("definitionCreated", spy);
            let addDefinitionPromise = definitionService.addDefinition(this.__testData.source);
            addDefinitionPromise.then(data => {
                expect(data).to.equal(response);
                expect(spy.called).to.equal(true);
                done();
            });
        });

        it("should handle failure", function (done) {
            let error = {};
            this.sandbox.stub(DefinitionModel, "createDefinition", (obj) => {
                return new Promise((resolve, reject) => reject(error));
            });
            let spy = this.sandbox.spy();
            definitionService.on("definitionCreated", spy);
            let addDefinitionPromise = definitionService.addDefinition(this.__testData.source);
            addDefinitionPromise.catch(err => {
                expect(err).to.equal(error);
                expect(spy.called).to.equal(false);
                done();
            });
        });
    });
});