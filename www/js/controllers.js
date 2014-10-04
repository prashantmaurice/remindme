angular.module('starter.controllers', [])


.controller('CardsCtrl', function($scope, Cards) {
	$scope.cards = Cards.all();
})

.controller('PlacesCtrl', function($scope, Places, $http) {
  	//$scope.friends = Places.all();
    $scope.CLientID = 'B212RBDANHUAROAMLQDQ5RNLMXBAPHDYL52RB3ZLP3ELMJHD';
    $scope.CLiendSecret = 'RXJ3D0OTNYDFKU4Z0QU4Z3G2FHFQ5UVBF3QYA4ZPACWAXTSW';
    $scope.api='https://api.foursquare.com/v2/venues/search?client_id='+$scope.CLientID+'&client_secret='+$scope.CLiendSecret+'&v=20130815';
  	$scope.initialize = function() {
        var myLatlng = new google.maps.LatLng(12.983662, 77.638499);
        var mapOptions = {
          zoom: 14,
          center: myLatlng
        };
        map = new google.maps.Map(document.getElementById('map-canvas2'),
            mapOptions);
        var marker_mylocation = new google.maps.Marker({
            position: myLatlng,
            map: map,
            draggable:true,
            animation: google.maps.Animation.DROP,
            title: 'Hello World!'
        });
        google.maps.event.addListener(marker_mylocation, 'click', toggleBounce);
        function toggleBounce() {

            if (marker_mylocation.getAnimation() != null) {
                marker_mylocation.setAnimation(null);
            } else {
                marker_mylocation.setAnimation(google.maps.Animation.BOUNCE);
            }
        }

  	};
    $scope.getPlaces = function(lat,long,query) {
        $http.get($scope.api+'&ll='+lat+','+long+'&query='+query+'').then(function(resp) {
            //$scope. = resp.data.conditions
            $scope.places = resp.data.response.venues;
            for(var i=0;i< $scope.places.length;i++){
                console.log($scope.places[i]);
                new google.maps.Marker({
                    position:  new google.maps.LatLng($scope.places[i].location.lat, $scope.places[i].location.lng),
                    map: map,
                    title: 'Hello World!'
                });
            }


        }, function(err) {
            console.error('ERR', err);
            // err.status will contain the status code
        });
        function addMarkersToLocations(){

        }

    };
    $scope.getPlaces(12.983662, 77.638499,'kfc');


})

.controller('PlacesDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
      
});
