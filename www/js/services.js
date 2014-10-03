var services = angular.module('starter.services', []);

/**
 * A simple example service that returns some data.
 */
services.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
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
