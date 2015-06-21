'use strict';

angular.module('cornerfindApp')
  .directive('easypost', function () {
    return {
      templateUrl: 'app/easypost/easypost.html',
      restrict: 'EA',
      scope: {
      	context: '@'
      },
      link: function (scope, element, attrs) {
      }
    };
  });