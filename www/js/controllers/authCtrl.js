angular.module("AAAA").controller("AuthCtrl", function ($scope, $rootScope, $location, $http, $cordovaOauth, $cordovaInAppBrowser) {
  const authUrl = 'https://1d091214.ngrok.io/auth/facebook/callback';
  $scope.fbLogin = () => {
    console.log('hello');
    $cordovaInAppBrowser.open(authUrl, '_blank')
      .then(() => {
        $http.get(authUrl)
          .then(userData => {
            let user = userData.data;
            $rootScope.currentUser = user;
            $cordovaInAppBrowser.close();
            $location.path('/home');
          });
      })
  }
});

