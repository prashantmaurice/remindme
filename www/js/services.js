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
        { id: 2, name: 'Super markets' }

    ];

  //get data from server


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    },
    categories : function(){
        return categories;
    }
  }
});

services.factory('Cards', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var cards = [
    {name:'American Extress',country:'Norway',selected:true},
    {name:'CitiBank',country:'Sweden',selected:false},
    {name:'Chase',country:'Denmark',selected:false}
  ];

  return {
    all: function() {
      return cards;
    },
    get: function(cardId) {
      // Simple index lookup
      return cards[cardId];
    }
  }
});
