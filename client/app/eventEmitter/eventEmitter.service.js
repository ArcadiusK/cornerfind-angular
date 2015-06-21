'use strict';

angular.module('cornerfindApp')
  .factory('eventEmitter', function () {

    // Public API here
    return {

      emitEvent: function(selected, event) {
         radio(event).broadcast(selected);
      },

      subscribeEvent: function(event, callback) {
        // console.log('event in factory is..', event)
        radio(event).subscribe(callback);
      }

    };
  });
