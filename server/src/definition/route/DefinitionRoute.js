"use strict";
import { app } from "../../core/view/Express.js";
import { Router } from "express";
import { definitionService } from "../servirce/DefinitionService.js";
import { ensureAuthenticated } from "../../auth/middleware/LoginMiddleware.js";
import passport from "passport";

export const definitionRouterConfig = {
    configure() {
        app.post("/definition", ensureAuthenticated, (req, res) => {
            definitionService.addDefinition(req.body)
                .then(model => res.json(model))
                .catch(err => {
                    res.status(500).send(err)
                });
        });
        app.get("/definition/:lang/:definition", (req, res) => {
            definitionService.getDefinitionBySource(req.params.lang, req.params.word)
                .then(model => res.json(model))
                .catch(err => {
                    res.status(404).send(err)
                });
        });
    }
};