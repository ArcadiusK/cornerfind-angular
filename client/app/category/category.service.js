'use strict';

angular.module('cornerfindApp')
  .factory('category', function ($resource) {
    return $resource('/api/categorys/:id',{id:'@_id'})
});
