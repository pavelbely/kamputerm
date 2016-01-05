"use strict";

import { WordModel } from "../model/WordModel.js";
import { EventEmitter } from "events";

class WordService extends EventEmitter {
    addWord(word) {
        return WordModel.createWord(word).then(data => {
            this.emit("wordCreated");
            return data;
        });
    }

    getWordBySource(lang, word) {
        return WordModel.findBySource(lang, word);
    }
}

export const wordService = new WordService();