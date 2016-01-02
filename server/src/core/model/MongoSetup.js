"use strict";
import Mongoose from "mongoose";

export const MongoConnection = {
    connect() {
        Mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/kamputerm');
    }
}
