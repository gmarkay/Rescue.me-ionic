angular.module("AAAA").factory("MapFactory", function ($http) {

  function addDefaultLocation(lat, lng) {
    return $http({
      method: 'PATCH',
      url: 'https://ad449109.ngrok.io/addlocation',
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

