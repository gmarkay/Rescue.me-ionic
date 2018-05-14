angular.module('AAAA').controller('HomeCtrl', function ($scope, HomeFactory, $rootScope, $location) {
  $scope.user = $rootScope.currentUser;
  console.log("currentUser in homectrl", $scope.user);
  $scope.newCar = {};

  $scope.showCars = () => {
    if ($scope.showVehicles) {
      $scope.showVehicles = false;
    } else {
      $scope.showVehicles = true;
      let user = $scope.user;
      HomeFactory.getVehicles()
        .then(vehicles => {
          $scope.cars = vehicles.data
        })
    }
  }
  $scope.newVehicle = () => {
    $scope.showCarForm = true;
  }
  $scope.submitCar = () => {
    HomeFactory.postVehicle($scope.newCar)
      .then(whatever => {
        $scope.showCarForm = false;
      });
  }
});

