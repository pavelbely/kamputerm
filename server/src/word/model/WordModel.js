"use strict";
import Mongoose from 'mongoose';

let WordEntrySchema = Mongoose.Schema({
    id: {type: String, index: true},
    value: {type: [String], index: true},
    _id: false
});

let WordSchema = Mongoose.Schema({
    sources: {type: [WordEntrySchema]},
    spellings: {type: [WordEntrySchema]},
    __version: {type: Number, default: 0},
    meta: {
        tags: [{type: String, index: true}]
    }
});

WordSchema.statics.findBySource = function (lang, word) {
    return this.find({
        sources: {
            $elemMatch: {
                id: lang,
                value: new RegExp(word, 'i')
            }
        }
    }).exec();
};

WordSchema.statics.updateWord = function (id, wordObject) {

};

WordSchema.statics.createWord = function (wordObject) {
    return this.create(wordObject);
};

export const WordModel = Mongoose.model('Word', WordSchema);