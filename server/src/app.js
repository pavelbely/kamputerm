import { loginConfig } from './auth/config/AuthConfig';
import { mongoConfig } from './core/model/MongoConfig';
export const app = express();
import { expressConfig } from './core/view/ExpressConfig';
import express from 'express';

process.env['NODE_CONFIG_DIR'] = 'lib/config';
let config = require('app-config');
loginConfig.configure(app, config);
mongoConfig.configure(config);
expressConfig.configure(app, config);

