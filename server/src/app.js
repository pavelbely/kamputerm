"use strict";
import { loginConfig } from "./auth/config/LoginConfig.js";
import { mongoConnection } from "./core/model/MongoSetup.js";
import { definitionRouterConfig } from "./definition/route/DefinitionRoute.js";
import { app } from "./core/view/Express.js";
import express from "express";

loginConfig.configure();
mongoConnection.connect();
definitionRouterConfig.configure();

app.use(express.static('views'));
app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/views/templates/index.html`);
})