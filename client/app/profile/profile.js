'use strict';

angular.module('cornerfindApp')
  .config(function ($stateProvider) {
    $stateProvider
     .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  });