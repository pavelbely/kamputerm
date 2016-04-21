'use strict';
import { loginConfig } from './auth/config/LoginConfig';
import { mongoConnection } from './core/model/MongoSetup';
import { definitionRouterConfig } from './definition/route/DefinitionRoute';
import exphbs from 'express-handlebars';
import { app } from './core/view/Express';
import express from 'express';

loginConfig.configure();
mongoConnection.connect();
definitionRouterConfig.configure();

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.render(`${__dirname}/public/index.hbs`, { bundleHost : ''});
});