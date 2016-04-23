import { loginConfig } from './auth/config/LoginConfig';
import { mongoConfig } from './core/model/MongoConfig';
import { definitionRouterConfig } from './definition/route/DefinitionRoute';
export const app = express();
import { expressConfig } from './core/view/ExpressConfig';
import express from 'express';

process.env['NODE_CONFIG_DIR'] = 'lib/config';
let config = require('app-config');
loginConfig.configure(app, config);
mongoConfig.configure(config);
definitionRouterConfig.configure(app);
expressConfig.configure(app, config);