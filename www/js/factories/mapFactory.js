'use strict';

angular.module("AAAA").factory("MapFactory", function ($http, $rootScope, apiUrl) {

  function addDefaultLocation(lat, lng) {
    return $http({
      method: 'PATCH',
      url: `${apiUrl}/addlocation`,
      params:{userId: $rootScope.cu_id},
      data: {
        default_lat: lat,
        default_lng: lng
      }
    });
  }
  return {
    addDefaultLocation
  }
});

