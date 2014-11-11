var devApp = angular.module('devApp', ['devCtrl']);

var devCtrl = angular.module('devCtrl', []);


devCtrl.controller('GCtrl', ['$scope', function ($scope) {
    $scope.name = 'grand-json'
    $scope.papa = "haha";
}]);

devCtrl.controller('PCtrl', ['$scope', function ($scope) {
    $scope.name = 'parent-json'
}]);

devCtrl.controller('CCtrl', ['$scope', function ($scope) {
    $scope.name = 'child-json'
}]);



