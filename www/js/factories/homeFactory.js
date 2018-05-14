angular.module("AAAA").factory("HomeFactory", function ($http) {

  function getVehicles() {
    return $http.get('https://ad449109.ngrok.io/vehicles')
  }

  function postVehicle(carData) {
    console.log(carData, 'here')
    return $http.post('https://ad449109.ngrok.io/newCar', carData)
  }
  return {
    getVehicles,
    postVehicle
  }
});

