'use strict';
import angular from 'angular';
import { ApplicationController } from './controllers/application';
import { LoginController } from './controllers/login';
var app = angular.module('kamputerm', []);
let applicationController = new ApplicationController(app);
let loginController = new LoginController(app);