import express from 'express';
import { loginConfig } from './auth/config/AuthConfig';
import { mongoConfig } from './core/model/MongoConfig';
export const app = express();
import { expressConfig } from './core/view/ExpressConfig';
process.env.NODE_CONFIG_DIR = 'lib/config';
const config = require('app-config');

loginConfig.configure(app, config);
mongoConfig.configure(config);
expressConfig.configure(app, config);

