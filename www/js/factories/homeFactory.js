'use strict';

angular.module("AAAA").factory("HomeFactory", function ($http, $rootScope, apiUrl) {

  function getVehicles() {
    return $http({
      method: 'GET',
      url: `${apiUrl}/vehicles`,
      params: { userId: $rootScope.cu_id }
    });
  }

  function postVehicle(carData) {
    return $http({
      method: 'POST',
      url: `${apiUrl}/newCar`,
      data: carData,
      params:{userId: $rootScope.cu_id}
    });
  }

  return {
    getVehicles,
    postVehicle
  }
});

