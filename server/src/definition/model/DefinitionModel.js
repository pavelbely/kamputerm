import Mongoose from 'mongoose';

let DefinitionModelInternal = undefined;

const LanguageDefinitionSchema = new Mongoose.Schema({
  spelling: { type: [String], required: true, index: true },
  definition: { type: String, required: true },
}, { _id: false });

const DefinitionSchema = new Mongoose.Schema({
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

DefinitionSchema.statics.findBySpelling = (lang, spelling) =>
  this.find({
    langs: {
      [lang]: {
        spelling: new RegExp(`^${spelling}`),
      },
    },
  }).exec();

DefinitionSchema.statics.checkValidity = (source) =>
  new Promise((resolve, reject) => {
    const model = DefinitionModelInternal.hydrate(source);
    model.validate(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

DefinitionSchema.statics.createDefinition = (definitionObject) =>
  this.create(definitionObject);

DefinitionModelInternal = Mongoose.model('Definition', DefinitionSchema);

export const DefinitionModel = DefinitionModelInternal;
