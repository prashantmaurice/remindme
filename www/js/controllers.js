angular.module('starter.controllers', [])


.controller('CardsCtrl', function($scope, Cards) {
	$scope.cards = Cards.all();
})

.controller('PlacesCtrl', function($scope, Places, $http, $ionicSlideBoxDelegate) {
  	$scope.categories = Places.categories();
    $scope.currQuery = "petrol";
    $scope.CLientID = 'B212RBDANHUAROAMLQDQ5RNLMXBAPHDYL52RB3ZLP3ELMJHD';
    $scope.CLiendSecret = 'RXJ3D0OTNYDFKU4Z0QU4Z3G2FHFQ5UVBF3QYA4ZPACWAXTSW';
    $scope.api='https://api.foursquare.com/v2/venues/search?client_id='+$scope.CLientID+'&client_secret='+$scope.CLiendSecret+'&v=20130815';
    $scope.myLatlng = new google.maps.LatLng(12.983662, 77.638499);
    $scope.radius = 10000;
  	$scope.initialize = function() {
//        $scope.myLatlng = new google.maps.LatLng(12.983662, 77.638499);
        navigator.geolocation.getCurrentPosition(showPosition);

        function showPosition(position) {
//            alert("Latitude: " + position.coords.latitude +"Longitude: " + position.coords.longitude);
            console.log("position set to :"+position.coords.latitude+"==="+position.coords.longitude);
            $scope.myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        }
        var mapOptions = {
          zoom: 12,
          center: $scope.myLatlng
        };
        map = new google.maps.Map(document.getElementById('map-canvas2'),mapOptions);
        var image = 'img/marker1.png';
//        var marker_mylocation = new google.maps.Marker({
//            position: $scope.myLatlng,
//            map: map,
//            draggable:true,
//            icon: image,
//            animation: google.maps.Animation.DROP,
//            title: 'Hello World!'
//        });
//        google.maps.event.addListener(marker_mylocation, 'click', toggleBounce);

        var populationOptions = {
            strokeColor: '#3399FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#3399FF',
            fillOpacity: 0.1,
            map: map,
            icon: {
                url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
                size: new google.maps.Size(7, 7),
                anchor: new google.maps.Point(4, 4)
            },
            center: $scope.myLatlng,
            editable : true,
            radius: $scope.radius
        };
        // Add the circle for this city to the map.
        var cityCircle = new google.maps.Circle(populationOptions);
        google.maps.event.addListener(cityCircle, 'center_changed', reDrawMarkers );
        google.maps.event.addListener(cityCircle, 'radius_changed', reDrawMarkers);

        function toggleBounce() {
            if (marker_mylocation.getAnimation() != null) {
                marker_mylocation.setAnimation(null);
            } else {
                marker_mylocation.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
        function reDrawMarkers(){
//            console.log(cityCircle.radius);
            //marker_mylocation.getPosition()
            map.setCenter(cityCircle.center);
//            console.log(marker_mylocation.position);
            $scope.myLatlng  = cityCircle.center;
            $scope.radius = cityCircle.radius;
            $scope.getPlaces(cityCircle.center.k,cityCircle.center.B,$scope.currQuery);
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
        $scope.currQuery = query;
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
                if($scope.places[i].distance>$scope.radius) continue;
                var marker = new google.maps.Marker({
                    position:  new google.maps.LatLng($scope.places[i].location.lat, $scope.places[i].location.lng),
                    //animation: google.maps.Animation.DROP,
                    map: map,
                    icon:image,
                    title: 'Hello World!'
                });
                markers.push(marker);
            }
            $ionicSlideBoxDelegate.enableSlide(false);//disable slider
            Places.set($scope.places);
            console.log($scope.places);


        }, function(err) {
            console.error('ERR', err);
            // err.status will contain the status code
        });

    };
    $scope.getPlaces(12.983662, 77.638499,'kfc');

    //slider code
    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.prevSlide = function() {
        $ionicSlideBoxDelegate.previous();
    };
    $scope.showDetails = function(place){
        $scope.clickedPlace = place;
        console.log(place.id);
        $ionicSlideBoxDelegate.next();
    }


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

.controller('AccountCtrl', function($scope,$ionicSlideBoxDelegate) {
        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next();
            $ionicSlideBoxDelegate.enableSlide(false);
        };
        $scope.prevSlide = function() {
            $ionicSlideBoxDelegate.previous();
            $ionicSlideBoxDelegate.enableSlide(false);
        };

        $ionicSlideBoxDelegate.next();
});
