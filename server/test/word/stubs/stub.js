"use strict";

export function createStubWord() {
    return {
        sources: [{lang: "eng", definition: ["scope"]}],
        spellings: [{definition: "tarask", choice: ["абшар"]}],
        meta: {
            tags: ["programming", "scripts"]
        }
    };
}

export function resolveWith(response) {
    return (obj) => {
        return new Promise((resolve, reject) => resolve(response));
    }
}

export function rejectWith(err) {
    return (obj) => {
        return new Promise((resolve, reject) => reject(err));
    }
}