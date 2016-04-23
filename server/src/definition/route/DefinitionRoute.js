'use strict';
import { Router } from 'express';
import { definitionService } from 'definition/servirce/DefinitionService';
import { ensureAuthenticated } from 'auth/middleware/LoginMiddleware';
import passport from 'passport';

export const definitionRouterConfig = {
    configure(app) {
        app.post('/definition', ensureAuthenticated, (req, res) => {
            definitionService.addDefinition(req.body)
                .then(model => res.json(model))
                .catch(err => {
                    res.status(500).send(err)
                });
        });
        app.get('/definition/:lang/:definition', (req, res) => {
            definitionService.getDefinitionBySource(req.params.lang, req.params.word)
                .then(model => res.json(model))
                .catch(err => {
                    res.status(404).send(err)
                });
        });
    }
};