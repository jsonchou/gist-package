var phonecatApp = angular.module('phonecatApp', [
'ngRoute',
'phonecatControllers'
]);

phonecatApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/list', {
            templateUrl: '/angularjs/views/member-list.html',
            controller: 'PhoneListCtrl'
        }).
        when('/id:phoneId', {
            templateUrl: '/angularjs/views/member-detail.html',
            controller: 'PhoneDetailCtrl'
        }).
        otherwise({
            redirectTo: '/phones'
        });
  }]);

