'use strict';

angular.module('cornerfindApp')
  .factory('condition', function ($resource) {
    return $resource('/api/conditions/:id',{id:'@_id'})
});
