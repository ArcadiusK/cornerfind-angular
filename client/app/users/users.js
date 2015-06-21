'use strict';

angular.module('cornerfindApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/users/:name',
        templateUrl: 'app/users/users.html',
        controller: 'UsersCtrl'
      })
      .state('add_product', {
        url: '/users/{name}/add',
        templateUrl: 'app/users/add_product/add_product.html',
        controller: 'AddProductCtrl'
      })
      .state('followers', {
        url: '/users/{name}/followers',
        templateUrl: 'app/users/followers/followers.html',
        controller: 'FollowersCtrl'
      })
       .state('following', {
        url: '/users/{name}/following',
        templateUrl: 'app/users/followers/following.html',
        controller: 'FollowingCtrl'
      })
  });