'use strict';

(function (window) {

    var tunesApp = angular.module('msgApp', []);

    window.msgCtrl = function ($scope, $http) {
        $http.get('albums.json').success(function (data) {
            $scope.msgs = data;
        });
    };
  
})(window);