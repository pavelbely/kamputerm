"use strict";
import { loginConfig } from "./auth/config/LoginConfig.js";
import { mongoConnection } from "./core/model/MongoSetup.js";
import { wordRouterConfig } from "./word/route/WordRoute.js";
import { app } from "./core/view/Express.js";
import express from "express";

loginConfig.configure();
mongoConnection.connect();
wordRouterConfig.configure();

app.use(express.static('views'));
app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/views/templates/index.html`);
})