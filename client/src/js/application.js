"use strict";
var app = angular.module('kamputerm', []);
app.controller('ApplicationController', ['$scope',
    function ApplicationController($scope) {
        $scope.template = {
            url: "templates/login.html"
        };
    }]);