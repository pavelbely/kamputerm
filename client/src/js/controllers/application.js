"use strict";
export class ApplicationController {
    constructor(app) {
        app.controller('ApplicationController', ['$scope',
            function ApplicationController($scope) {
                $scope.template = {
                    url: "templates/login.html"
                };
            }]);
    }
}