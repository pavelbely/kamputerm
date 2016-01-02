"use strict";
import express from "express";
import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let server = app.listen(3000, function () {
    console.log(`listening server on port ${server.address().port}`);
});
