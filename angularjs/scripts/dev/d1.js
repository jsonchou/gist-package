var devApp = angular.module('devApp', ['devControllers']);

var devControllers = angular.module('devControllers', []);

devControllers.controller("devCtrl1", ["$scope", function ($scope) {
    $scope.num = 1;
    $scope.price = 19.95;
}]);