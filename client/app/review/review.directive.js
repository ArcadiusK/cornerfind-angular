'use strict';

angular.module('cornerfindApp')
  .directive('review', function () {
    return {
      templateUrl: 'app/review/review.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });