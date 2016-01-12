'use strict';
import { loginConfig } from './auth/config/LoginConfig';
import { mongoConnection } from './core/model/MongoSetup';
import { definitionRouterConfig } from './definition/route/DefinitionRoute';
import { app } from './core/view/Express';
import express from 'express';

loginConfig.configure();
mongoConnection.connect();
definitionRouterConfig.configure();

app.use(express.static(__dirname + '/public'));
//app.get('/', function (req, res) {
//    res.sendFile(`${__dirname}/views/templates/index.html`);
//})