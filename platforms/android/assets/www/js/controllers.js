var app = angular.module('starter.controllers', []);
app.constant('$ionicLoadingConfig', {
    template: 'Loading...'
})


.controller('CardsCtrl', function($scope, Cards, $ionicLoading) {
    $scope.wallet = Cards.wallet();
    console.log("TEST:"+Cards.allCard());
    var template1 = "<i class='ion-loading-d'></i>Loading";

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
                card: card.bank,
                type:cardtype.type,
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

.controller('PlacesCtrl', function($scope,Cards, Places, $http, $ionicSlideBoxDelegate,$ionicLoading ) {
    console.log("PLACES page location data:"+JSON.stringify(Cards.getlocation()))
  	$scope.categories = Places.categories();
    $scope.currQuery = "petrol";
    $scope.CLientID = 'B212RBDANHUAROAMLQDQ5RNLMXBAPHDYL52RB3ZLP3ELMJHD';
    $scope.CLiendSecret = 'RXJ3D0OTNYDFKU4Z0QU4Z3G2FHFQ5UVBF3QYA4ZPACWAXTSW';
    $scope.api='https://api.foursquare.com/v2/venues/search?client_id='+$scope.CLientID+'&client_secret='+$scope.CLiendSecret+'&v=20130815';
    $scope.myLatlng = new google.maps.LatLng(Cards.getlocation().lat, Cards.getlocation().long);//default chennai
    $scope.radius = 5000;
    $scope.wallet = Cards.wallet();
    $scope.cards = Cards.allCard();
//    Cards.setdebug("WOLLAH");
//    $scope.debug = Cards.debug();
    $scope.cards = Cards;
    Cards.setdebug("PlacesCtrl called:"+new Date().getTime());

    //get position




    $scope.initialize = function(){
        Cards.setdebug("initialize called:"+$scope.myLatlng.k);
//        $scope.debug = "STARTED";
//        Cards.setdebug("STARTED");
        $scope.showPosition = function (position) {
//            alert("Latitude: " + position.coords.latitude +"Longitude: " + position.coords.longitude);
            console.log("position set from :"+$scope.myLatlng.k+"==="+$scope.myLatlng.B);
            $scope.myLatlng.k = position.coords.latitude;
            $scope.myLatlng.B = position.coords.longitude;
            console.log("position set to :"+$scope.myLatlng.k+"==="+$scope.myLatlng.B);

            Cards.setdebug("SUCCESS:Location from cordova:"+position.coords.latitude);
            $scope.initialize2();
        };
        var showLoading = function() {
            $ionicLoading.show({
                template : "<i class='ion-loading-d'></i>  Getting Location from Cordova...."
            });
        };
        showLoading();
        navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.cordovaLocFail ,{ timeout: 3000 });
    };
    $scope.cordovaLocFail = function(){
        $scope.loadingIndicator4 = $ionicLoading.show({
            template: 'timedout.. adding task to background'
        });
        setTimeout(function(){$scope.loadingIndicator4.hide()}, 1000);
        navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.initialize2 ,{ timeout: 3000000 });
        $scope.initialize2();
    }

  	$scope.initialize2 = function() {
        $ionicLoading.hide();
        Cards.setdebug("initialize2 called:"+$scope.myLatlng.k);
        console.log("initialize2 called");
//        $scope.debug = "FAIL:";
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
            console.log(marker_mylocation.position);
            $scope.myLatlng  = marker_mylocation.position;
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
        $scope.getPlaces($scope.myLatlng.k, $scope.myLatlng.B,'KFC');

  	};
    var markers = [];
    $scope.getPlacesCurr = function(query) {
        $scope.getPlaces($scope.myLatlng.k, $scope.myLatlng.B, query);
    }
    $scope.getPlaces = function(lat,long,query) {
        $scope.currQuery = query;
        console.log("API:"+$scope.api+'&ll='+lat+','+$scope.myLatlng.B+'&query='+query+'');
        $scope.loadingIndicator2 = $ionicLoading.show({
            content: 'Showing Loading Indicator!',
            template: '<i class="ion-looping"></i> getting venues from Foursquare',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 10
        });
        $http.get($scope.api+'&ll='+$scope.myLatlng.k+','+$scope.myLatlng.B+'&query='+query+'').then(function(resp) {
            $scope.loadingIndicator2.hide();
            $scope.loadingIndicator3 = $ionicLoading.show({
                template: 'successfully acquired'
            });
            setTimeout(function(){$scope.loadingIndicator3.hide()}, 1000);
            $scope.populateMap($scope.myLatlng.k,$scope.myLatlng.B,query,resp,null);
        }, function(err) {
            console.error('ERR', err);
            $scope.loadingIndicator2.hide();
            $scope.loadingIndicator3 = $ionicLoading.show({
                template: '<i class="ion-looping"></i> Could not get data'
            });
            setTimeout(function(){$scope.loadingIndicator3.hide()}, 1000);
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

    //populate map
    $scope.populateMap = function(lat,long,query,resp,place) {
        $scope.loadingIndicator = $ionicLoading.show({
            content: 'Showing Loading Indicator!',
            template: '<i class="ion-looping"></i> Populating results',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 10
        });

        if(place!=null) $scope.clickedPlace = place;
        if(resp!=null) var placesTemp = resp.data.response.venues;
        else var placesTemp = $scope.places;
        $scope.places=[];
        var image = 'img/marker_restaurent.png';
        var image2 = 'img/marker1.png';
        var imagehigh = 'img/marker_restaurent_high.png';
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        for(var i=0;i< placesTemp.length;i++){
            //filtering venues based on rewards
            placesTemp[i].distance=google.maps.geometry.spherical.computeDistanceBetween (
                new google.maps.LatLng(lat, long),
                new google.maps.LatLng(placesTemp[i].location.lat, placesTemp[i].location.lng));
            if(placesTemp[i].distance>$scope.radius) continue;//distance filter

            if(place!=null)
                var icon = ($scope.clickedPlace.id==placesTemp[i].id)?imagehigh:image;
            else
                var icon = image;
            var marker = new google.maps.Marker({
                position:  new google.maps.LatLng(placesTemp[i].location.lat, placesTemp[i].location.lng),
                //animation: google.maps.Animation.DROP,
                map: map,
                icon:icon,
                title: 'Hello World!'
            });

            placesTemp[i].category = $scope.currQuery;
//            $scope.evaluateDiscounts(placesTemp[i])
            marker.id = placesTemp[i].id;
            marker.place = placesTemp[i];
            google.maps.event.addListener(marker, 'click', function(marker){console.log(this) ; $scope.mapMarkerClick(this)});
            markers.push(marker);
            $scope.places.push(placesTemp[i]);
            if(place!=null)
                if($scope.clickedPlace.id==placesTemp[i].id) map.panTo(marker.position);

        }
        $ionicSlideBoxDelegate.enableSlide(false);//disable slider
        Places.set($scope.places);
        console.log($scope.places);
        $scope.loadingIndicator.hide();

    };
    $scope.evaluateDiscounts = function(place) {
        var category = place.category;
        var wallet = $scope.wallet;
        for(var i=0; i<wallet.length;i++){
            var categoriesAvailable = wallet[i].categories;
            for(var j=0; j<categoriesAvailable.length;j++){
                if(categoriesAvailable[j]==category){
                    console.log('MATCH:'+category+"=="+wallet[i].id+"=="+wallet[i].typeId);
                    var cardFound = $scope.getType(wallet[i].id, wallet[i].typeId);
                    if(place.rewards!=null) {
                        if (place.rewards < cardFound.rewards){
                            place.rewards = cardFound.rewards;
                            place.rewardCardNum = i;
                        }
                    }else {place.rewards = cardFound.rewards;place.rewardCardNum = i;}

                    if(place.cashback!=null) {
                        if (place.cashback < cardFound.cashback)
                        {place.cashback = cardFound.cashback;
                            place.cashbackCardNum = i;}
                    }else {place.cashback = cardFound.cashback;place.cashbackCardNum = i;}
                }
            }
        }
    };
    $scope.getType =  function(cardId,cardTypeId) {
        // Simple index lookup
        console.log('BAKE:'+$scope.cards.length);
        for(var i=0;i<$scope.cards.length;i++){
            console.log('hook1');
            if(cardId==$scope.cards[i].id){
                for(var j=0;j<$scope.cards[i].types.length;j++){
                    console.log("CALL1:"+cardTypeId+"=="+$scope.cards[i].types[j].id);
                    if(cardTypeId==$scope.cards[i].types[j].id){
                        return $scope.cards[i].types[j];
                    }
                }
            }
        }
        return null;
    }
    //slider code
    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.prevSlide = function() {
        $ionicSlideBoxDelegate.previous();
    };
    $scope.showDetails = function(place){
        $scope.populateMap($scope.myLatlng.k,$scope.myLatlng.B,null,null,place);
//        var image = 'img/marker_restaurent.png';
//        var image2 = 'img/marker1.png';
//
//
//        $scope.clickedPlace = place;
//        //console.log(place.id);
//
//        //copied from getPlaces function above
//        var placesTemp = $scope.places;
//        $scope.places=[];
//        var image = 'img/marker_restaurent.png';
//        var image2 = 'img/marker_restaurent_high.png';
//        for (var i = 0; i < markers.length; i++) {
//            markers[i].setMap(null);
//        }
//        for(var i=0;i< placesTemp.length;i++){
//            //console.log($scope.places[i]);
//            placesTemp[i].distance=google.maps.geometry.spherical.computeDistanceBetween ($scope.myLatlng,
//                new google.maps.LatLng(placesTemp[i].location.lat, placesTemp[i].location.lng));
//            if(placesTemp[i].distance>$scope.radius) continue;
//            var marker = new google.maps.Marker({
//                position:  new google.maps.LatLng(placesTemp[i].location.lat, placesTemp[i].location.lng),
//                //animation: google.maps.Animation.DROP,
//                map: map,
//                icon:($scope.clickedPlace.id==placesTemp[i].id)?image2:image,
//                title: 'Hello World!'
//            });
//            if($scope.clickedPlace.id==placesTemp[i].id) map.panTo(marker.position);
//            marker.id = placesTemp[i].id;
//            marker.place = placesTemp[i];
//            google.maps.event.addListener(marker, 'click', function(marker){console.log(this) ; $scope.mapMarkerClick(this)});
//            markers.push(marker);
//            $scope.places.push(placesTemp[i]);
//
//        }
//        $ionicSlideBoxDelegate.enableSlide(false);//disable slider
//        Places.set($scope.places);
//        //console.log($scope.places);


        $ionicSlideBoxDelegate.previous();
        $ionicSlideBoxDelegate.next();
    }


})

.controller('PlacesDetailCtrl', function($scope, Cards,$stateParams, Places) {
        console.log($stateParams.friendId);
        console.log(Places.getall());
        console.log(Places.get($stateParams.friendId));
    $scope.place = Places.get($stateParams.friendId);
        $scope.wallet = Cards.wallet();
        $scope.cards = Cards.allCard();
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
