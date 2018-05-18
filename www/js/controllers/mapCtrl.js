'use strict';

angular.module('AAAA').controller('MapCtrl', function (MapFactory, $scope, $interval, $rootScope, $timeout, $compile, $ionicLoading, $cordovaLocalNotification, $cordovaGeolocation, $cordovaLaunchNavigator, $ionicPlatform) {
  $scope.locToken;

  $ionicPlatform.ready(function () {
    $scope.notification = () => {
      // $scope.place = new google.maps.LatLng($scope.incident_lat, $scope.incident_lng);
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Accident',
        text: `There was an accident`,
        foreground: true
      }).then(function () {
        console.log('Notification triggered');
      });
    }
  })

  $scope.$on("$cordovaLocalNotification:click", function (notification, state) {
    if (state.id =1) {
      MapFactory.closeNotification($scope.incidentId);
      locCircle();
    }
  });

  function init() {
    let location;
    $scope.locToken = 'defLoc';
    if ($rootScope.currentUser.default_lat) {
      location = new google.maps.LatLng($rootScope.currentUser.default_lat, $rootScope.currentUser.default_lng)
    } else {
      location = new google.maps.LatLng(36.161049, -86.777223);
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
      let newLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      $scope.locToken = 'myLoc';
      $scope.marker.setMap(null);
      pinLocation(newLocation);
      $scope.map.setCenter(newLocation);
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $interval(getMyPosition, 20000);

  function getMyPosition() {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.myLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      MapFactory.addCurrentLocation(pos.coords.latitude, pos.coords.longitude)
        .then(data => {
          if (data.length > 0) {
            data.forEach(incident => {
              console.log(incident.location_lat, 'in loop');
              $scope.description = incident.description;
              $scope.locDescription = incident.locationDescription;
              $scope.incident_lat = parseFloat(incident.location_lat);
              $scope.incident_lng = parseFloat(incident.location_lng);
              $scope.incidentId = incident.id;
              $scope.notification();
            })
          }
        });
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

  const tokenSwitch = () => {
    switch ($scope.locToken) {
      case 'defLoc':
        console.log('new location');
        newDefLocation();
        break;
      case 'myLoc':
        console.log('my location');
    }
  };

  let newDefLocation = () => {
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
      .then(location => {})
    $scope.infoWindow.close();
  };


  const locCircle = () => {
    let incidentLocation = new google.maps.LatLng($scope.incident_lat , $scope.incident_lng);                 
    const areaCircle = new google.maps.Circle({
      strokeColor: '#00000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      clickable: true,
      fillColor: '#8000ff',
      fillOpacity: 0.35,
      map: $scope.map,
      center: {
        lat: $scope.incident_lat,
        lng: $scope.incident_lng
      },
      radius: 1000
    })
    $scope.map.setCenter(incidentLocation);

    $scope.circleWindow = new google.maps.InfoWindow({
      content: ""
    });
    google.maps.event.addListener(areaCircle, 'click', function (ev) {
      let circleHtml = `<div>${$scope.description} ${$scope.locDescription}<br><button ng-click='accept()'>Accept?</button><div>`
      let compiled = $compile(circleHtml)($scope);
      $scope.circleWindow.setContent(compiled[0]);
      $scope.circleWindow.setPosition(areaCircle.getCenter());
      $scope.circleWindow.open($scope.map);
    });

  };

  $scope.accept = () => {
    console.log('this button click worked');
    calcRoute();
    $scope.circleWindow.close();

  }

  const calcRoute = () => {
    var destination = [$scope.incident_lat, $scope.incident_lng];
    var start = $scope.myLocation;

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

