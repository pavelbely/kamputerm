"use strict";
import { app } from "../../core/view/Express.js";
import { Router } from "express";
import { wordService } from "../servirce/WordService.js";
import { ensureAuthenticated } from "../../auth/middleware/LoginMiddleware.js";
import passport from "passport";

export const wordRouterConfig = {
    configure() {
        console.log("configuring route");
        app.post("/word", ensureAuthenticated, (req, res) => {
            console.log("word route post");
            wordService.addWord(req.body)
                .then(model => res.json(model))
                .catch(err => {
                    res.status(404).send(err)
                });
        });
    }
};