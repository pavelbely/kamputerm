'use strict';
import Mongoose from 'mongoose';

export const mongoConnection = {
    connect() {
        Mongoose.set('debug', true);
        Mongoose.Promise = global.Promise;
        Mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/kamputerm');
    }
}
