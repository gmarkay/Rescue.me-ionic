'use strict';
angular.module('AAAA').controller('HomeCtrl', function ($scope, HomeFactory, $location, $ionicPlatform) {

  $scope.incident = {};

  $scope.sendHelp = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.incident.location_lat = pos.coords.latitude;
      $scope.incident.location_lng = pos.coords.longitude;
      console.log($scope.incident);
      
      HomeFactory.newIncident($scope.incident)
      .then(incident=>{
        alert("Your request for help was submitted, please await a response");
        console.log(incident, 'incident in return');
      })

    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  }
});

