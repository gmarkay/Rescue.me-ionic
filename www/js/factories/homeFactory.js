angular.module("AAAA").factory("HomeFactory", function ($http, $rootScope, apiUrl) {

  function newIncident(incidentData) {
    console.log(incidentData, 'data in factory');
    console.log($rootScope.cu_id, 'current user id in factory');
    return $http({
      method: 'POST',
      url: `${apiUrl}/newIncident`,
      data: incidentData,
      params:{UserId: $rootScope.cu_id}
    });

  }
  return {
    newIncident
  };
})


