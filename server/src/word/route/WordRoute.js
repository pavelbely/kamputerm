"use strict";
import { app } from "../../core/view/Express.js";
import { Router } from "express";
import { wordService } from "../servirce/WordService.js";
import { ensureAuthenticated } from "../../auth/middleware/LoginMiddleware.js";
import passport from "passport";

export const wordRouterConfig = {
    configure() {
        app.post("/word", ensureAuthenticated, (req, res) => {
            wordService.addWord(req.body)
                .then(model => res.json(model))
                .catch(err => {
                    res.status(500).send(err)
                });
        });
        app.get("/word/:lang/:word", (req, res) => {
            wordService.getWordBySource(req.params.lang, req.params.word)
                .then(model => res.json(model))
                .catch(err => {
                    res.status(404).send(err)
                });
        });
    }
};