var devApp = angular.module('devApp', ['devControllers', 'devFilters']);
var devControllers = angular.module('devControllers', []);
var devFilters = angular.module('devFilters', []);

devControllers.controller("ACtrl", ["$scope", function ($scope) {
    $scope.name = "json";
}]);

devControllers.controller("BCtrl", ["$scope", function ($scope) {
    $scope.names = ['a', 'b', 'c', 'd'];
    $scope.pop = function (msg) {
        alert(msg);
    }
}]);

devFilters.filter('CusFilter', function () {
    return function (txt) {
        return txt ? "OK" : "ERROR";
    }
});
