// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, Cards) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
      console.log(JSON.stringify(Cards.getlocation()));
      cordova.exec(function(data){
          console.log(JSON.stringify(data));
          Cards.getlocation().lat = data.lat;
          Cards.getlocation().long = data.long;
          Cards.setdebug("ANDROID LOC:"+data.long);

      }, function(err) {
          console.log("Error while getting data");
          Cards.setdebug("Error: ANDROID LOC:"+err.toString());
      }, "Device", "getDeviceInfo", ["test"]);


      //call HTML5 location
      var showPosition = function (position) {
//            alert("Latitude: " + position.coords.latitude +"Longitude: " + position.coords.longitude);
//          console.log("position set from :"+$scope.myLatlng.k+"==="+$scope.myLatlng.B);
//          $scope.myLatlng.k = position.coords.latitude;
//          $scope.myLatlng.B = position.coords.longitude;
//          console.log("position set to :"+$scope.myLatlng.k+"==="+$scope.myLatlng.B);

          Cards.setdebug("SUCCESS:Location2 from cordova:"+position.coords.latitude);
//          $scope.initialize2();
      };
      navigator.geolocation.getCurrentPosition(showPosition, null ,{ timeout: 3000000 });



  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.cards', {
      url: '/cards',
      views: {
        'tab-cards': {
          templateUrl: 'templates/tab-cards.html',
          controller: 'CardsCtrl'
        }
      }
    })
      .state('tab.addcards', {
          url: '/cards/add',
          views: {
              'tab-cards': {
                  templateUrl: 'templates/tab-addcards.html',
                  controller: 'AddCardsCtrl'
              }
          }
      })
      .state('tab.addcardstypes', {
          url: '/cards/add/:type',
          views: {
              'tab-cards': {
                  templateUrl: 'templates/tab-addcards-types.html',
                  controller: 'AddCardsCtrl'
              }
          }
      })
    .state('tab.places', {
      url: '/places',
      views: {
        'tab-places': {
          templateUrl: 'templates/tab-places.html',
          controller: 'PlacesCtrl'
        }
      }
    })
    .state('tab.places-detail', {
      url: '/places/:friendId',
      views: {
        'tab-places': {
          templateUrl: 'templates/places-detail.html',
          controller: 'PlacesDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'

          //  controller: 'PlacesDetailCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/cards');

});

