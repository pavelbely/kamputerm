'use strict';
import Mongoose from 'mongoose';

let LanguageDefinitionSchema = Mongoose.Schema({
  spelling: { type: [String], required: true, index: true },
  definition: { type: String, required: true },
}, { _id: false });

let DefinitionSchema = Mongoose.Schema({
  langs: {
    en: { type: LanguageDefinitionSchema },
    by_narkam: { type: LanguageDefinitionSchema },
    by_tarask: { type: LanguageDefinitionSchema },
    by_lacinka: { type: LanguageDefinitionSchema },
  },
  meta: {
    tags: { type: [String], index: true },
  },
});

DefinitionSchema.statics.findBySpelling = function (lang, spelling) {
  return this.find({
    'langs': {
      [lang]: {
        'spelling': new RegExp(`^${spelling}`),
      },
    },
  }).exec();
};

DefinitionSchema.statics.checkValidity = function (source) {
  return new Promise((resolve, reject) => {
    let model = DefinitionModel.hydrate(source);
    model.validate(err => {
      if (err) {
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
