'use strict';
import Mongoose from 'mongoose';

export const mongoConfig = {
  configure(config) {
    Mongoose.set('debug', true);
    Mongoose.Promise = global.Promise;
    Mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kamputerm');
  },
};
