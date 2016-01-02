"use strict";
import { app } from "../../core/view/Express.js";
import { wordService } from "../servirce/WordService.js";

export const WordRout = app.route("/word")
    .post((req, res) => {
        wordService.addWord(req.body)
            .then(model => res.json(model))
            .catch(err => {
                res.status(404).send(err)
            });
    });