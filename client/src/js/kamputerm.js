'use strict';
var angular = require('angular');
var app = angular.module('kamputerm', []);
var application = require('./controllers/application')(app);
var login = require('./controllers/login')(app);