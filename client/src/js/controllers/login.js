'use strict';
export class LoginController {
    constructor(app) {
        app.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
            $scope.master = {};

            $scope.reset = function () {
                $scope.user = {};
            };

            $scope.send = function () {
                var res = $http.post('/login', $scope.user);
                res.success(function (data, status, headers, config) {
                    $scope.message = data;
                });
                res.error(function (data, status, headers, config) {
                    alert('failure message: ' + JSON.stringify({data: data}));
                });
            };

            $scope.reset();
        }]);
    }
}
