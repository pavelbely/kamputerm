"use strict";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import flash from "connect-flash";
import cookieParser from "cookie-parser";

export const app = express();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

let server = app.listen(3000, function () {
    console.log(`listening server on port ${server.address().port}`);
});
