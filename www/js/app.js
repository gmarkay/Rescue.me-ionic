angular.module('AAAA', ['ionic', 'ionic.native', 'ngCordova', 'ngCordovaOauth'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // if(window.StatusBar) {
      //   StatusBar.styleDefault();
      // }
      if (window.cordova && window.cordova.plugins.notification.local) {
        console.log('ready')
      }
    });
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          home: {
            templateUrl: 'templates/home.html',
            // controller: 'HomeCtrl'
          }
        }
      })
      .state('profile', {
        url: '/profile',
        views: {
          profile: {
            templateUrl: 'templates/profile.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('map', {
        url: '/map',
        views: {
          map: {
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl'
          }
        }
      })
      .state('login', {
        url: '/login',
        views: {
          login: {
            templateUrl: 'templates/login.html',
            controller: 'AuthCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/home');

  });

