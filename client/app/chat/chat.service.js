'use strict';

angular.module('cornerfindApp')
  .factory('chat', function ($http, $q) {
    // Service logic
    // ...
    var chatlist = [];

    // Public API here
    return {
      getChatList: function (productID) {
        // console.log('productID:', productID);
        var deferred = $q.defer();

        $http.get('/api/chats/' + productID)
        .success(function(results) {
            deferred.resolve(results);
        }).error(function() {
            console.log('Chat Get Failed');
        });

        return deferred.promise;
      // socket.syncUpdates('chat', $scope.chatlist);
      },

      addChat: function(newChat) {
        chatList = chatList.push(newChat);
        console.log(chatList);
      }
    };

  });
