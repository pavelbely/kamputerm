"use strict";
module.exports = function(app) {
    return app.controller('ApplicationController', ['$scope',
        function ApplicationController($scope) {
            $scope.template = {
                url: "templates/login.html"
            };
        }]);
};