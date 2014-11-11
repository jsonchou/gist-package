var phonecatApp = angular.module('phonecatApp', ['ngRoute', 'phonecatControllers', 'phonecatFilters', 'phonecatServices']);


phonecatApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/list', {
            templateUrl: '/angularjs/views/member-list.html',
            controller: 'PhoneListCtrl'
        }).
        when('/list/:pid', {
            templateUrl: '/angularjs/views/member-detail.html',
            controller: 'PhoneDetailCtrl'
        }).
        otherwise({
            redirectTo: '/list'
        });
  }]);

