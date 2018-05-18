'use strict';

angular.module('AAAA').controller('ProfileCtrl', function ($scope, ProfileFactory, $location) {
  $scope.newCar = {};
  $scope.showCars = () => {
    if ($scope.showVehicles) {
      $scope.showVehicles = false;
    } else {
      $scope.showVehicles = true;
      ProfileFactory.getVehicles()
        .then(vehicles => {
          $scope.cars = vehicles.data
        })
    }
  }
  $scope.newVehicle = () => {
    $scope.showCarForm = true;
  }
  $scope.submitCar = () => {
    ProfileFactory.postVehicle($scope.newCar)
      .then(whatever => {
        $scope.showCarForm = false;
      });
  }
});

