var phonecatControllers = angular.module('phonecatControllers', []);

//phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
//  function ($scope, $http) {
//      $http.get('/angularjs/scripts/ng/mv.json').success(function (data) {
//          $scope.phones = data;
//      });

//      $scope.orderProp = 'age';
//  }]);


phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Mv', function ($scope, Mv) {
    $scope.phones = Mv.query();
    $scope.orderProp = 'age';
}]);

//phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams','$http',
//  function ($scope, $routeParams, $http) {
//      $http.get('/angularjs/scripts/ng/mv-' + $routeParams.phoneId.replace(':', '') + '.json').success(function (data) {
//          $scope.phone = data;
//      });

//      $scope.popAb = function (src) {
//          alert(src)
//      }

//  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Mv', function ($scope, $routeParams, Mv) {
    
    $scope.phone = Mv.get({ pid: $routeParams.pid }, function (data) {
        $scope.mainImageUrl = data.images[0];
    });

    $scope.popAb = function (src) {
        alert(src);
    }

}]);