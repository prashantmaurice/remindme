angular.module('starter.controllers', [])


.controller('CardsCtrl', function($scope, Cards) {
    $scope.wallet = Cards.wallet();
})
.controller('AddCardsCtrl', function($scope,Cards,$stateParams) {
        $scope.wallet = Cards.wallet();
        $scope.cards = Cards.allCard();
        $scope.type = $stateParams.type;
        $scope.isActive = function(card) {
            return card.id.toString() === $scope.type;
        };
        $scope.activate = function(cardtype , card) {
            console.log(card.toString);
            $scope.wallet.push({
                id: card.id,
                name: card.name,
                country:card.country,
                type:cardtype.name,
                typeId : cardtype.id,
                categories : cardtype.categories,
                selected : true
            });
            var backView = $scope.$viewHistory.views[$scope.$viewHistory.backView.backViewId];
            $scope.$viewHistory.forcedNav = {
                viewId:     backView.viewId,
                navAction: 'moveBack',
                navDirection: 'back'
            };
            backView && backView.go();
        };
})

.controller('PlacesCtrl', function($scope, Places, $http, $ionicSlideBoxDelegate) {
  	$scope.categories = Places.categories();
    $scope.currQuery = "petrol";
    $scope.CLientID = 'B212RBDANHUAROAMLQDQ5RNLMXBAPHDYL52RB3ZLP3ELMJHD';
    $scope.CLiendSecret = 'RXJ3D0OTNYDFKU4Z0QU4Z3G2FHFQ5UVBF3QYA4ZPACWAXTSW';
    $scope.api='https://api.foursquare.com/v2/venues/search?client_id='+$scope.CLientID+'&client_secret='+$scope.CLiendSecret+'&v=20130815';
    $scope.myLatlng = new google.maps.LatLng(13.057605, 80.228280);//default chennai
    $scope.radius = 5000;

    //get position




    $scope.initialize = function(){
        $scope.showPosition = function (position) {
//            alert("Latitude: " + position.coords.latitude +"Longitude: " + position.coords.longitude);
            console.log("position set from :"+$scope.myLatlng.k+"==="+$scope.myLatlng.B);
            $scope.myLatlng.k = position.coords.latitude;
            $scope.myLatlng.B = position.coords.longitude;
            console.log("position set to :"+$scope.myLatlng.k+"==="+$scope.myLatlng.B);
            $scope.initialize2();
//
        };
        navigator.geolocation.getCurrentPosition($scope.showPosition);
    };

  	$scope.initialize2 = function() {
//        $scope.myLatlng = new google.maps.LatLng(12.983662, 77.638499);
//        navigator.geolocation.getCurrentPosition(showPosition);

//        function showPosition(position) {
////            alert("Latitude: " + position.coords.latitude +"Longitude: " + position.coords.longitude);
//            console.log("position set from :"+$scope.myLatlng.k+"==="+$scope.myLatlng.B);
//            $scope.myLatlng.k = position.coords.latitude;
//            $scope.myLatlng.B = position.coords.longitude;
//            console.log("position set to :"+$scope.myLatlng.k+"==="+$scope.myLatlng.B);
//
//        }
        //$ionicLoading.show({ template: 'Initialize called!', noBackdrop: true, duration: 2000 });
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

        var populationOptions = {
            strokeColor: '#3399FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#3399FF',
            fillOpacity: 0.1,
            map: map,
//            icon: {
//                url: "img/location_pin.png",
//                size: new google.maps.Size(700, 700),
//                anchor: new google.maps.Point(40, 40)
//            },
            //center: $scope.myLatlng,
            editable : true,
            radius: $scope.radius
        };
        // Add the circle for this city to the map.
        var cityCircle = new google.maps.Circle(populationOptions);
        cityCircle.bindTo('center', marker_mylocation, 'position');
        google.maps.event.addListener(marker_mylocation, 'dragend', reDrawMarkers );
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
//            map.setCenter(marker_mylocation.position);
            console.log(marker_mylocation.position);
//            console.log(cityCircle);
            $scope.myLatlng  = cityCircle.center;
            $scope.radius = cityCircle.radius;

            $scope.getPlaces(marker_mylocation.position.k,marker_mylocation.position.B,$scope.currQuery);
            //removeMarkers();
        }
        function removeMarkers(){
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
        }

        //last initialize
        $scope.getPlaces($scope.myLatlng.k, $scope.myLatlng.B,'kfc');

  	};
    var markers = [];
    $scope.getPlacesCurr = function(query) {
        $scope.getPlaces($scope.myLatlng.k, $scope.myLatlng.B, query);
    }
    $scope.getPlaces = function(lat,long,query) {

        $scope.currQuery = query;
        console.log("API:"+$scope.api+'&ll='+lat+','+long+'&query='+query+'');
        $http.get($scope.api+'&ll='+lat+','+long+'&query='+query+'').then(function(resp) {
            //$scope. = resp.data.conditions

            var placesTemp = resp.data.response.venues;
            $scope.places=[];
            var image = 'img/marker_restaurent.png';
            var image2 = 'img/marker1.png';
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            for(var i=0;i< placesTemp.length;i++){
                placesTemp[i].distance=google.maps.geometry.spherical.computeDistanceBetween (
                      new google.maps.LatLng(lat, long),
                    new google.maps.LatLng(placesTemp[i].location.lat, placesTemp[i].location.lng));
//                placesTemp[i].distance=234;

                if(placesTemp[i].distance>$scope.radius) continue;
                var marker = new google.maps.Marker({
                    position:  new google.maps.LatLng(placesTemp[i].location.lat, placesTemp[i].location.lng),
                    //animation: google.maps.Animation.DROP,
                    map: map,
                    icon:image,
                    title: 'Hello World!'
                });

                marker.id = placesTemp[i].id;
                marker.place = placesTemp[i];
                google.maps.event.addListener(marker, 'click', function(marker){console.log(this) ; $scope.mapMarkerClick(this)});
                markers.push(marker);
                $scope.places.push(placesTemp[i]);

            }
            $ionicSlideBoxDelegate.enableSlide(false);//disable slider
            Places.set($scope.places);
            console.log($scope.places);


        }, function(err) {
            console.error('ERR', err);
            // err.status will contain the status code
        });

    };
    $scope.mapMarkerClick = function(marker2) {
        for(var i=0;i< $scope.places.length;i++){
            if(marker2.id == $scope.places[i].id) {$scope.clickedPlace = $scope.places[i];$scope.clickedPlace.distance = $scope.places[i].distance;}
        }
//        $scope.clickedPlace = marker2.place;
//        console.log(marker2);
        $scope.showDetails(marker2.place);
//        $ionicSlideBoxDelegate.next();
    };
//        $scope.showPosition = function (position) {
////            alert("Latitude: " + position.coords.latitude +"Longitude: " + position.coords.longitude);
//            console.log("position set from :"+$scope.myLatlng.k+"==="+$scope.myLatlng.B);
//            $scope.myLatlng.k = position.coords.latitude;
//            $scope.myLatlng.B = position.coords.longitude;
//            console.log("position set to :"+$scope.myLatlng.k+"==="+$scope.myLatlng.B);
//
//        };
//        console.log('check1');
//        navigator.geolocation.getCurrentPosition($scope.showPosition);
//        console.log('check2');
    //$scope.getPlaces($scope.myLatlng.k, $scope.myLatlng.B,'kfc');

    //slider code
    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.prevSlide = function() {
        $ionicSlideBoxDelegate.previous();
    };
    $scope.showDetails = function(place){
        var image = 'img/marker_restaurent.png';
        var image2 = 'img/marker1.png';

        $scope.clickedPlace = place;
        //console.log(place.id);

        //copied from getPlaces function above
        var placesTemp = $scope.places;
        $scope.places=[];
        var image = 'img/marker_restaurent.png';
        var image2 = 'img/marker_restaurent_high.png';
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        for(var i=0;i< placesTemp.length;i++){
            //console.log($scope.places[i]);
            placesTemp[i].distance=google.maps.geometry.spherical.computeDistanceBetween ($scope.myLatlng,
                new google.maps.LatLng(placesTemp[i].location.lat, placesTemp[i].location.lng));
            if(placesTemp[i].distance>$scope.radius) continue;
            var marker = new google.maps.Marker({
                position:  new google.maps.LatLng(placesTemp[i].location.lat, placesTemp[i].location.lng),
                //animation: google.maps.Animation.DROP,
                map: map,
                icon:($scope.clickedPlace.id==placesTemp[i].id)?image2:image,
                title: 'Hello World!'
            });
            if($scope.clickedPlace.id==placesTemp[i].id) map.panTo(marker.position);
            marker.id = placesTemp[i].id;
            marker.place = placesTemp[i];
            google.maps.event.addListener(marker, 'click', function(marker){console.log(this) ; $scope.mapMarkerClick(this)});
            markers.push(marker);
            $scope.places.push(placesTemp[i]);

        }
        $ionicSlideBoxDelegate.enableSlide(false);//disable slider
        Places.set($scope.places);
        //console.log($scope.places);


        $ionicSlideBoxDelegate.previous();
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
