'use strict';

angular.module('cornerfindApp')
    .controller('FollowingCtrl', function($scope, Auth, User, $stateParams) {
        // Get user of current page
        User.getUserByName({
                username: $stateParams.name
            }, function(user) {
                $scope.user = user;
            })
    });