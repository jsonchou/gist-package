var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Mv', ['$resource',
  function ($resource) {
      ///angularjs/scripts/ng/mv.json
      return $resource('/angularjs/scripts/ng/:pid.json', {}, {
          query: { method: 'GET', params: { pid: 'list' }, isArray: true }
      });
  }]);