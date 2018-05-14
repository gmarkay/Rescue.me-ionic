'use strict';

angular.module('AAAA').controller('HomeCtrl', function ($scope, HomeFactory, $location) {
  $scope.newCar = {};
  $scope.showCars = () => {
    if ($scope.showVehicles) {
      $scope.showVehicles = false;
    } else {
      $scope.showVehicles = true;
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

