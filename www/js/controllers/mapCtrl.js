angular.module('AAAA').controller('MapCtrl', function ($scope, $timeout, $ionicLoading, $cordovaLocalNotification, $cordovaGeolocation, $cordovaLaunchNavigator, $ionicPlatform) {

  $ionicPlatform.ready(function () {
    $scope.sendNot = () => {
      $scope.place =  new google.maps.LatLng(42.161049, -95.777223);

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
    let mapOptions = {
      center: new google.maps.LatLng(36.161049, -86.777223),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions)
  }
  $scope.center = function () {
    alert("clicked");

    console.log("Centering");
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
      pinLocation($scope.myLocation);
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  const pinLocation = (location) => {
    console.log('here', )
    let marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: location
    });
    google.maps.event.addListener(marker, 'click', function () {
      var infowindow = new google.maps.InfoWindow({
        content: "Hello World!"
      });
      infowindow.open(map, marker);
    });
  }
  const locCircle = (newLoc)=>{
    let areaCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map:$scope.map,
      center: {lat: 40.714, lng: -74.005},
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

