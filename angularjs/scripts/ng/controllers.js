var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope) {
    $scope.phones = [
      {
          'name': 'Nexus S',
          'snippet': 'Fast just got faster with Nexus S.'
      },
      {
          'name': 'Motorola XOOM™ with Wi-Fi',
          'snippet': 'The Next, Next Generation tablet.'
      },
      {
          'name': 'MOTOROLA XOOM™',
          'snippet': 'The Next, Next Generation tablet.'
      }
    ];
});


//数组
phonecatApp.controller('ArrayCtrl', function ($scope) {
    
});

phonecatApp.controller('UzaiCtrl', function ($scope) {
    $scope.members = [
        {
            name: 'json',
            sex: '男'
        }, {
            name: 'axiao',
            sex: '男'
        }, {
            name: 'maeo',
            sex: '女'
        }, {
            name: 'maxo',
            sex: '女'
        }
    ]

    $scope.orderUzai = 'sex';
});


//injection
phonecatApp.controller('UzaiInjectionCtrl', function ($scope, $http) {
    //http://10.1.11.8:214/test/member.json angularjs 存在跨域问题。
    $http.get('/angularjs/scripts/ng/member.json').success(function (data) {
        $scope.members = data;
    })
});




















