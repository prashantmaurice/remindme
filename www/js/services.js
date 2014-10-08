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
  // Might use a resource here that returns a JSON array

  // Some fake testing data

  var cards = [
    {
        id:1,
        name:'American Express',
        country:'Norway',
        types:[
            {
                name:'Blue Cash Everyday',
                cashback: 3,
                rewards : 0,
                category : 'supermarkets'
            },
            {
                name:'Everyday Credit card',
                cashback:0,
                rewards : 2,
                category : 'supermarkets'
            }
        ],
        selected:true
    }
  ];

    var wallet = [
        {
            id:1,
            name:'American Express',
            country:'Norway',
            type:'Blue Cash Everyday',
            typeId : 1,
            selected : true
        }
     ];


  return {
    all: function() {
      return cards;
    },
    wallet: function() {
      return wallet;
    },
    get: function(cardId) {
      // Simple index lookup
      return cards[cardId];
    },
    importCards:function(scope){
          var promise = $http.get('cards.json');
        return promise;
    }
  }
});
