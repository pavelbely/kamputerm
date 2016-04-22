'use strict';

import { DefinitionModel } from 'definition/model/DefinitionModel';
import { EventEmitter } from 'events';

class WordService extends EventEmitter {
    addDefinition(word) {
        return DefinitionModel.createDefinition(word).then(data => {
            this.emit('definitionCreated');
            return data;
        });
    }

    getDefinitionBySource(lang, word) {
        return DefinitionModel.findBySource(lang, word);
    }
}

export const definitionService = new WordService();