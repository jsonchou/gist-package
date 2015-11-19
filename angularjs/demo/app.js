var myapp = angular.module('myapp', []);

//myapp.directive('expander', function () {
//    return {
//        restrict: 'EA',
//        replace: true,
//        transclude: true,
//        scope: {
//            title: '=expanderTitle'
//        },
//        template: '<div>'
//                 + '<div class="title" ng-click="toggle()">{{title}}</div>'
//                 + '<div class="body" ng-show="showMe" ng-transclude></div>'
//                 + '</div>',
//        link: function (scope, element, attrs) {
//            scope.showMe = false;
//            scope.toggle = function toggle() {
//                scope.showMe = !scope.showMe;
//            }
//        }
//    }
//});






//自定义属性

//myapp.directive('myAttr', function () {
//    return {
//        restrict: 'AE',
//        priority: 0,
//        replace: false,
//        transclude:false,
//        template: '<div ng-transclude>{{name}}</div>',
//        scope: {
//            name: '@forName'
//        },
//        compile: function () {
//            console.log("ng-my-a-compile");
//            return function () {
//                console.log("ng-my-a-link");
//            }
//        }
//    }
//});

myapp.controller('myCtrl', function ($scope) {
    $scope.dataName = 'hehe';
    $scope.dataObj = { nickname: 'jsonchou' };
});

myapp.directive('myObj', function () {
    return {
        restrict: 'AE',
        priority: 1,
        replace: false,
        transclude: true,
        template: '<span ng-transclude></span><div >{{obj.nickname}}</div>',
        scope: {
            obj: '=myAttr'
        },
        compile: function () {
            console.log("ng-my-b-compile");
            return function () {
                console.log("ng-my-b-link");
            }
        }
    }
});

