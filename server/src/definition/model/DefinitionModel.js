'use strict';
import Mongoose from 'mongoose';

let DefinitionSourceSchema = Mongoose.Schema({
    lang: {type: String, index: true},
    definition: {type: [String], index: true},
    _id: false
});

let DefinitionSpellingSchema = Mongoose.Schema({
    spelling: {type: String, index: true},
    choice: {type: [String], index: true},
    _id: false
});

let DefinitionSchema = Mongoose.Schema({
    sources: {type: [DefinitionSourceSchema]},
    spellings: {type: [DefinitionSpellingSchema]},
    __version: {type: Number, default: 0},
    meta: {
        tags: [{type: String, index: true}]
    }
});

DefinitionSchema.statics.findBySource = function (lang, definition) {
    return this.find({
        sources: {
            $elemMatch: {
                id: lang,
                value: new RegExp(definition, 'i')
            }
        }
    }).exec();
};

DefinitionSchema.statics.updateDefinition = function (id, definitionObject) {

};

DefinitionSchema.statics.checkValidity = function (source) {
    return new Promise((resolve, reject) => {
        let model = DefinitionModel.hydrate(source);
        model.validate(err => {
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

DefinitionSchema.statics.createDefinition = function (definitionObject) {
    return this.create(definitionObject);
};

export const DefinitionModel = Mongoose.model('Definition', DefinitionSchema);