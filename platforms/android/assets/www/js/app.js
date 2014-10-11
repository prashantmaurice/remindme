// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
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
      var call = function(){navigator.helloworld.say("BAH")}
      cordova.exec(call(), function(err) {
              callback('Nothing to echo.');
          },"Echo", "echo", [str]);

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

