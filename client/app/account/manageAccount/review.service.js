'use strict';

angular.module('cornerfindApp')
  .factory('review', function($http, $location, $resource) {
    return{
      resource: $resource('/api/reviews/:id/:controller', { id: '@_id'}, {
        update: {
          method: 'PUT'
        }
      })
    }
  })