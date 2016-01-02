"use strict";

import { WordModel } from "../model/WordModel.js";
import { EventEmitter } from "events";

class WordService extends EventEmitter {
    addWord(word) {
        var promise = new Promise((resolve, reject) => {
            WordModel.createWord(word, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    this.emit("wordCreated");
                    resolve(data);
                }
            });
        });
        return promise;
    }
}

export const wordService = new WordService();