'use strict';

angular.module('cornerfindApp')
  .directive('chat', function () {
    return {
      templateUrl: 'app/chat/chat.html',
      restrict: 'EA',
      scope: {chatlist: '=',
              addchat: '&'
  		},
      // link: function (scope, element, attrs) {
      // }
    };
  });