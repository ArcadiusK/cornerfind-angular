'use strict';

angular.module('cornerfindApp')
  .factory('products', function($http, $location, $resource) {
    return{
      
      resource: $resource('/api/products/:id/:controller', { id: '@_id'}, {
        update: {
          method: 'PUT'
        },
        search : {
         // url: '/api/products/search/:query',
          isArray: true,
          method: 'GET',
          params: {
            id: '@searchtext',
            controller: 'search'
          }
        },
        updateQuantity : {
          url: '/api/products/qty/:id',
          method: 'PUT'
        },
        getUsersListings: {
          method: 'GET',
          isArray: true,
          params: {
            id: '@id',
            controller: 'listings'
          }
        },
         getOwner: {
          method: 'GET',
          params: {
            id: '@id',
            listings: 'owner'
          }
        },
         getFiltered: {
          method: 'POST',
           isArray: true,
          params: {
            controller: 'filtered'
          }
        }
      })
    }
  })


