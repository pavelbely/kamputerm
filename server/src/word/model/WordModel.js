"use strict";
import Mongoose from 'mongoose';

let WordEntrySchema = Mongoose.Schema({
    id: {type: String, index: true},
    value: {type: String, index: true}
});

let WordSchema = Mongoose.Schema({
    sources: {type: [WordEntrySchema]},
    spellings: {type: [WordEntrySchema]},
    meta: {
        tags: [{type: String, index: true}]
    }
});

export const WordModel = Mongoose.model('Word', WordSchema);