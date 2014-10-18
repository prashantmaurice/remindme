var services = angular.module('starter.services', []);

/**
 * A simple example service that returns some data.
 */
services.factory('Places', function () {

    // Some fake testing data
    var categories = [
        { id: 0, name: 'Restaurent' },
        { id: 1, name: 'Petrol' },
        { id: 2, name: 'KFC' },
        { id: 2, name: 'bar' },
        { id: 2, name: 'Super markets' },
        { id: 2, name: 'MC Donalds' },
        { id: 2, name: 'pub' },
        { id: 2, name: 'chinese' }

    ];

    //get data from server


    return {
        all: function () {
            return friends;
        },
        get: function (friendId) {
            // Simple index lookup
            for (var i = 0; i < friends.length; i++) {
                if (friendId == friends[i].id) return friends[i];
            }
            return null;
        },
        getall: function () {
            return friends;
        },
        categories: function () {
            return categories;
        },
        set: function (markers) {
            friends = markers;
            return friends;
        }
    }
});

services.factory('Cards', function ($http,$ionicLoading) {
    //TODO:get this data from server or local storage
    var cards = [];
    //default location - somewhere in desert
    var location = {
        lat: 17.4123487,
        long: 78.4080455
    };
    var debug = {
        async : null,
        string : "debug string"
    };
//    debug.async = "<i class='ion-loading-d'></i>";

    //get data from file(or cloud)
//    var promise = $http.get('cards.json');
//    promise.then(function(data){
//        cards = data.data.data;
//        console.log("successfully imported cards from storage:"+data.data.data);
//    });
    //get data from cloud
//    var promise = $http.get('cards.json');
//    promise.then(function(data){
//        cards = data.data.data;
//        console.log("successfully imported cards from storage:"+data.data.data);
//    });

    //GET CARDS FROM SERVER
    var getCardsFromServer = function(){
        var loading1 = $ionicLoading.show({template : "<i class='ion-loading-d'></i>  Loading Cards...."});
        $http.get('http://remindme.prashantmaurice.in/cards/all').then(function (resp) {
            cards = resp.data.banks;
            console.log('HTTP CARDS RESPONSE:');
            console.log(resp);
            loading1.hide();
            var loading2 = $ionicLoading.show({template : "Successfully loaded cards"});
            setTimeout(function(){loading2.hide()}, 1000);
        }, function (err) {        console.error('ERR: Could not get cards from server', err);
            loading1.hide();
            var loading2 = $ionicLoading.show({template : "ERROR: could not connect to server"});
            setTimeout(function(){loading2.hide()}, 1000);
        });
    };
    getCardsFromServer();

//    //GET LOCATION FROM CORDOVA
    var savePosition = function (position) {
//        debug.async = null;
        console.log("cordova:position set from :"+location.lat+"==="+location.long);
        location.lat = position.coords.latitude;
        location.long = position.coords.longitude;
        console.log("cordova:position set to :"+location.lat+"==="+location.long);
        debug.string = "SUCCESS:Location from cordova:"+position.coords.latitude;
//        loadingIndicator5.hide();
        debug.async = "Successfully retreived location from cordova";
        setTimeout(function(){debug.async = null}, 1000);
    };
    var cordovaLocFail = function(){
//        debug.async = null;
//        loadingIndicator5.hide();
        debug.async = "Failed to get location from cordova";
//        var loadingIndicator4 = $ionicLoading.show({template: 'timedout.. adding task to background'});
        setTimeout(function(){debug.async = null}, 1000);
//        navigator.geolocation.getCurrentPosition(savePosition, cordovaLocFail ,{ timeout: 3000000 });
    };
    debug.async = "<i class='ion-loading-d'></i> Getting location from cordova";
    navigator.geolocation.getCurrentPosition(savePosition, cordovaLocFail ,{ timeout: 3000 });








    //TODO:make this wallet load data from local storage
    var wallet = [
        {
            id: 1,
            card: 'American Express',
            type: 'Blue Cash Everyday',
            typeId: 1,
            categories: ["petrol", "KFC"],
            selected: true
        }
    ];
    //var debug = "debug string";

    return {
        allCard: function () {
            return cards;
        },
        wallet: function () {
            return wallet;
        },
        get: function (cardId) {
            // Simple index lookup
            return cards[cardId];
        },
        getlocation: function () {
            return location;
        },
        debug: function () {
            return debug.string;
        },
        setdebug: function (str) {
            debug.string = str;
            return debug.string;
        },
        getcardsfromserver: function(){
            getCardsFromServer();
            return;
        },
        getdebug2: function () {
            return debug;
        }

    }
});
