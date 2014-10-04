angular.module('starter.controllers', [])


.controller('CardsCtrl', function($scope, Cards) {
	$scope.cards = Cards.all();
})

.controller('PlacesCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
  $scope.initialize = function() {
        var mapOptions = {
          zoom: 14,
          center: new google.maps.LatLng(12.983662, 77.638499)
        };
        map = new google.maps.Map(document.getElementById('map-canvas2'),
            mapOptions);
      }
})

.controller('PlacesDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
      
});
