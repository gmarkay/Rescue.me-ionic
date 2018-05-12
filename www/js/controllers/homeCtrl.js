angular.module('AAAA').controller('HomeCtrl', function ($scope, $rootScope) {
  $scope.user = $rootScope.currentUser;
  console.log("currentUser in homectrl", $scope.user);
});

