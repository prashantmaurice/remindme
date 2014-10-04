angular.module('starter.controllers', [])


.controller('CardsCtrl', function($scope, Cards) {
	$scope.cards = Cards.all();
})

.controller('PlacesCtrl', function($scope, Places, $http) {
  	$scope.categories = Places.categories();

    $scope.CLientID = 'B212RBDANHUAROAMLQDQ5RNLMXBAPHDYL52RB3ZLP3ELMJHD';
    $scope.CLiendSecret = 'RXJ3D0OTNYDFKU4Z0QU4Z3G2FHFQ5UVBF3QYA4ZPACWAXTSW';
    $scope.api='https://api.foursquare.com/v2/venues/search?client_id='+$scope.CLientID+'&client_secret='+$scope.CLiendSecret+'&v=20130815';
    $scope.myLatlng = new google.maps.LatLng(12.983662, 77.638499);
  	$scope.initialize = function() {
        $scope.myLatlng = new google.maps.LatLng(12.983662, 77.638499);
        var mapOptions = {
          zoom: 12,
          center: $scope.myLatlng
        };
        map = new google.maps.Map(document.getElementById('map-canvas2'),mapOptions);
        var image = 'img/marker1.png';
        var marker_mylocation = new google.maps.Marker({
            position: $scope.myLatlng,
            map: map,
            draggable:true,
            icon: image,
            animation: google.maps.Animation.DROP,
            title: 'Hello World!'
        });
        google.maps.event.addListener(marker_mylocation, 'click', toggleBounce);
        google.maps.event.addListener(marker_mylocation, 'dragend', reDrawMarkers );
        function toggleBounce() {
            if (marker_mylocation.getAnimation() != null) {
                marker_mylocation.setAnimation(null);
            } else {
                marker_mylocation.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
        function reDrawMarkers(){
            //marker_mylocation.getPosition()
            map.setCenter(marker_mylocation.position);
//            console.log(marker_mylocation.position);
            $scope.myLatlng  = marker_mylocation.position;
            $scope.getPlaces(marker_mylocation.position.k,marker_mylocation.position.B,"restaurent");
            //removeMarkers();
        }
        function removeMarkers(){
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
        }

  	};
    var markers = [];
    $scope.getPlacesCurr = function(query) {
        $scope.getPlaces($scope.myLatlng.k, $scope.myLatlng.B, query);
    }
    $scope.getPlaces = function(lat,long,query) {
        $http.get($scope.api+'&ll='+lat+','+long+'&query='+query+'').then(function(resp) {
            //$scope. = resp.data.conditions
            $scope.places = resp.data.response.venues;
            var image = 'img/marker_restaurent.png';
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            for(var i=0;i< $scope.places.length;i++){
                //console.log($scope.places[i]);
                $scope.places[i].distance=google.maps.geometry.spherical.computeDistanceBetween ($scope.myLatlng,
                    new google.maps.LatLng($scope.places[i].location.lat, $scope.places[i].location.lng));
                var marker = new google.maps.Marker({
                    position:  new google.maps.LatLng($scope.places[i].location.lat, $scope.places[i].location.lng),
                    //animation: google.maps.Animation.DROP,
                    map: map,
                    icon:image,
                    title: 'Hello World!'
                });
                markers.push(marker);
            }
            Places.set($scope.places);
            console.log($scope.places);


        }, function(err) {
            console.error('ERR', err);
            // err.status will contain the status code
        });

    };
    $scope.getPlaces(12.983662, 77.638499,'kfc');


})

.controller('PlacesDetailCtrl', function($scope, $stateParams, Places) {
        console.log($stateParams.friendId);
        console.log(Places.getall());
        console.log(Places.get($stateParams.friendId));
    $scope.place = Places.get($stateParams.friendId);
    $scope.goBack = function() {
        alert('working');
        $ionicNavBarDelegate.back();
    };
})

.controller('AccountCtrl', function($scope) {
      
});
