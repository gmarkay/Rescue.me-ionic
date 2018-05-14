'use strict';

angular.module("AAAA").controller("AuthCtrl", function ($scope, $rootScope, $location, $http, $cordovaOauth, $cordovaInAppBrowser, apiUrl) {
  const authUrl = `${apiUrl}/auth/facebook/callback`;
  $scope.fbLogin = () => {
      $cordovaInAppBrowser.open(authUrl, '_blank')
      .then(() => {
        $http.get(authUrl)
          .then(userData => {
            $rootScope.currentUser = userData.data;
            $rootScope.cu_id = userData.data.id;
            $cordovaInAppBrowser.close();
            $location.path('/home');
          });
      })
  }
});

