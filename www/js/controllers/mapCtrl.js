'use strict';

angular.module('AAAA').controller('MapCtrl', function (MapFactory, $scope, $rootScope, $timeout, $compile, $ionicLoading, $cordovaLocalNotification, $cordovaGeolocation, $cordovaLaunchNavigator, $ionicPlatform) {
  $scope.locToken;

  $ionicPlatform.ready(function () {
    $scope.sendNot = () => {
      $scope.place = new google.maps.LatLng(42.161049, -95.777223);
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Accident',
        text: 'There was an accident',
        foreground: true,
        data: {
          destination: $scope.place
        }
      }).then(function () {
        console.log('Notification triggered');
      });
    }
  })

  $scope.$on("$cordovaLocalNotification:click", function (notification, state) {
    alert(" was clicked");
    if (state.id = 1) {
      let accLocation = new google.maps.LatLng(state.data.destination);
      console.log(accLocation, 'acclocation');
      locCircle(accLocation);
    }
  });

  function init() {
    let location
    if ($rootScope.currentUser.default_lat) {
      let lat = $rootScope.currentUser.default_lat;
      let lng = $rootScope.currentUser.default_lng;
      location = new google.maps.LatLng(lat, lng)
      $scope.locToken = 'choseLoc';
    } else {
      location = new google.maps.LatLng(36.161049, -86.777223);
      $scope.locToken = 'defLoc'
    } 
    let mapOptions = {
      center: location,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    pinLocation(location);
  }

  $scope.center = function () {
    if (!$scope.map) {
      return;
    }
    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.myLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      $scope.map.setCenter($scope.myLocation);
      $scope.locToken = 'myLoc'
      pinLocation($scope.myLocation);
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };


  const pinLocation = (location) => {
    $scope.marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: location,
      draggable: true
    });
    console.log(location, location);
    $scope.infoWindow = new google.maps.InfoWindow({
      content: ""
    });
    tokenSwitch();
  };

  const tokenSwitch =()=>{
    switch ($scope.locToken){
      case 'choseLoc': 
        console.log('chose location');
        break;
      case 'defLoc':
      console.log('new location');
        newDefLocation();
        break;
      case'myLoc':
        console.log('my location');
    }
  };

  let newDefLocation = () => {
    $scope.infoWindow.setContent("drag the marker to your desired default location")
    $scope.infoWindow.open($scope.map, $scope.marker);

    google.maps.event.addListener($scope.marker, 'dragend', function () {
      $scope.lat = $scope.marker.getPosition().lat();
      $scope.lng = $scope.marker.getPosition().lng();
      let markerHtml = `<button ng-click='setDefLocation()'>Set Location</button>`
      let compiled = $compile(markerHtml)($scope)
      $scope.infoWindow.setContent(compiled[0])
      $scope.infoWindow.open($scope.map, $scope.marker);
    });
  }

  $scope.setDefLocation = () => {
    MapFactory.addDefaultLocation($scope.lat, $scope.lng)
      .then(location => {
      })
      $scope.infoWindow.close();
  }


  const locCircle = (newLoc) => {
    let areaCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: $scope.map,
      center: {
        lat: 40.714,
        lng: -74.005
      },
      radius: 500
    })
  };

  $scope.calcRoute = () => {
    var destination = [36.161049, -86.777223];
    var start = $scope,
      myLocation;

    $cordovaLaunchNavigator.navigate(destination, start).then(function () {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
    });
  }

  if (document.readyState === "complete") {
    console.log('hello')
    init();
  } else {
    $timeout(function () {
      console.log("No confirmation from user, using fallback");
      init();
    }, 5000);
  }
});

