'use strict';

angular.module('cornerfindApp')
  .factory('likes', function ($resource) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    return{

      resource: $resource('/api/likes/:id/:string', { id: '@_id'}, {
        update: {
          method: 'PUT'
        },
        getUserLikes : {
          isArray: true,
          method: 'GET',
          params: {
            string: 'user',
            id: '@id'
          }
        },
        getProductLikes : {
          isArray: true,
          method: 'GET',
          params: {
            string: 'product',
            id: '@id'
          }
        },
        deleteLike : {
          url: '/api/likes/delete',
          method: 'POST'
        }
      }),

    }
});
