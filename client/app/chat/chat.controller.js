'use strict';

angular.module('cornerfindApp')
    .controller('ChatCtrl', function($scope, $http, chat, $firebase, Auth, $stateParams) {
        // $scope.myDataRef = new Firebase('https://cornerfind.firebaseio.com/');
        $scope.productID = $stateParams.id;
        var ref = new Firebase('https://cornerfind.firebaseio.com/chats/' + $scope.productID);
        var sync = $firebase(ref);
        $scope.chatList = sync.$asObject();
        $scope.newChat = {
            username: '',
            textLine: ''
        };

        $scope.addChat = function(paramNewChatText) {

            $scope.newChat.textLine = paramNewChatText;
            $scope.newChat.username = Auth.getCurrentUser().username;

            console.log('hitting function');
            $http.post('/api/chats', {

                newChat: $scope.newChat,
                productID: $scope.productID

            });
            $scope.newChatText = '';
        };



        $scope.isLoggedIn = function() {
            return Auth.isLoggedIn();
        };

        // $scope.addChatFire = function(newChatText){
        //       console.log('NewChatText Variable:', newChatText);
        // sync.$push({name: "Arcadius", text: newChatText});
        //     };



        // $scope.addThing = function() {
        //   if($scope.newThing === '') {
        //     return;
        //   }
        //   $http.post('/api/things', { name: $scope.newThing });
        //   $scope.newThing = '';
        // };

        // $scope.deleteThing = function(thing) {
        //   $http.delete('/api/things/' + thing._id);
        // };

        // $scope.$on('$destroy', function () {
        //   socket.unsyncUpdates('thing');
        // });

    });
