var services = angular.module('starter.services', []);

/**
 * A simple example service that returns some data.
 */
services.factory('Places', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' },
    { id: 4, name: 'Miss Frizzle' },
    { id: 5, name: 'Ash Ketchum' },
    { id: 6, name: 'Miss Frizzle' },
    { id: 7, name: 'Ash Ketchum' },
    { id: 8, name: 'Miss Frizzle' },
    { id: 9, name: 'Ash Ketchum' }
  ];
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
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      for(var i=0;i< friends.length;i++){
          if(friendId==friends[i].id) return friends[i];
      }
      return null;
    },
    getall : function(){
        return friends;
    },
    categories : function(){
        return categories;
    },
    set: function(markers){
        friends = markers;
        return friends;
    }
  }
});

services.factory('Cards', function($http) {
    // Some fake testing data
    //TODO:get this data from server or local storage
    var cards = [//dummy data //TODO:remove this bit and make sure ur code runs only after import
        {
            "id":1,
            "name":"American Express",
            "country":"Norway",
            "types":[
                {
                    "id" : 1,
                    "name":"Blue Cash Everyday",
                    "cashback": 3,
                    "rewards" : 0,
                    "categories" : ["supermarkets", "petrol","KFC"]
                },
                {
                    "id" : 2,
                    "name":"Everyday Credit card",
                    "cashback":0,
                    "rewards" : 2,
                    "categories" : ["supermarkets","KFC"]
                }
            ],
            "selected":true
        }];
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
    $http.get('http://localhost:9000/cards/all').then(function(resp) {
        cards = resp.data.banks;
        console.log('HTTP RESPONSE:');
        console.log(resp);
    }, function(err) {
        console.error('ERR: Could not get from server', err);
    })

    //default location - somewhere in desert
    var location = {
        lat     :   12,
        long    :  80.
    }


    //TODO:make this wallet load data from local storage
    var wallet = [
        {
            id:1,
            card:'American Express',
            type:'Blue Cash Everyday',
            typeId : 1,
            categories : ["petrol","KFC"],
            selected : true
        }
     ];


  return {
    allCard: function() {
      return cards;
    },
    wallet: function() {
      return wallet;
    },
    get: function(cardId) {
      // Simple index lookup
      return cards[cardId];
    },
    getlocation: function() {
        return location;
    }
  }
});
