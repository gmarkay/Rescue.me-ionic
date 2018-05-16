'use strict';


angular.module('AAAA', ['ionic', 'ionic.native', 'ngCordova', 'ngCordovaOauth'])
  .constant('apiUrl', 'https://8448e6d8.ngrok.io')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          home: {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('profile', {
        url: '/profile',
        views: {
          profile: {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileCtrl'
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
        url: '/',
        views: {
          login: {
            templateUrl: 'templates/login.html',
            controller: 'AuthCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  })
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // if(window.StatusBar) {
      //   StatusBar.styleDefault();
      // }
      if (window.cordova && window.cordova.plugins.notification.local) {
        console.log('ready')
      }
    });
  });

