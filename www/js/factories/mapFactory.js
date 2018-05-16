'use strict';

angular.module("AAAA").factory("MapFactory", function ($http, $rootScope, apiUrl) {

  function addDefaultLocation(lat, lng) {
    return $http({
      method: 'PATCH',
      url: `${apiUrl}/addlocation`,
      params: {
        userId: $rootScope.cu_id
      },
      data: {
        default_lat: lat,
        default_lng: lng
      }
    });
  }
  function closeNotification(incidentId){
    return $http({
    method: 'PATCH',
    url: `${apiUrl}/noticationRead`,
    data: {
      incidentId: incidentId
    }
  })

  }
  function addCurrentLocation(lat, lng) {
    return $http({
      method: 'PATCH',
      url: `${apiUrl}/addCurrentLocation`,
      params: {
        userId: $rootScope.cu_id
      },
      data: {
        current_lat: lat,
        current_lng: lng
      }
    }).then(data => {
      console.log(data);
      return $http.get(`${apiUrl}/incidents`)
    }).then(incidents => {
      let inces = [];
      let dist;
      incidents.data.forEach((incident) => {
        dist = distance(lat, lng, incident.location_lat, incident.location_lng, 'M')
        if (dist < 5)
          inces.push(incident);
      })
      return inces;
    })
  }

  function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    console.log(dist);
    return dist
  }

  // function getUserLocation(lat, lng) {
  //   return $http({
  //     method: 'GET',
  //     url: `${apiUrl}/userLocation`,
  //     params: {
  //       userId: $rootScope.cu_id
  //     }
  //   }).then(loc => {
  //     console.log(loc, 'loc');
  //     console.log(lat, 'lat', lng, 'lng')
  //       addCurrentLocation(lat, lng)
  //     } else {
  //       return "You haven't moved. Great Job!";
  //     }
  //   });
  // }



  return {
    addDefaultLocation,
    addCurrentLocation,
    closeNotification
  }
});

