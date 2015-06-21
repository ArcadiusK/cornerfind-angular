'use strict';

angular.module('cornerfindApp') //look into $urlrouterprovider otherwise method
  .config(function ($stateProvider) {
    $stateProvider
      .state('account',{
        url: '/account',
        templateUrl: 'app/account/manageAccount/manageAccount.html',
        controller: 'ManageAccountCtrl'
      })
      .state('account.address',{
        templateUrl: 'app/account/manageAccount/manageAddress.html',
        controller: "EasypostCtrl"
      })
      .state('account.profile',{
        templateUrl: 'app/account/manageAccount/manageProfile.html',
        controller: "ManageProfileCtrl"
      })
      .state('account.settings',{
        templateUrl: 'app/account/manageAccount/changePassword.html',
        controller: 'ChangePasswordCtrl'
      })
      .state('account.listings',{
        templateUrl: 'app/account/manageAccount/manageListings.html',
        controller: 'ManageListingsCtrl'

      })
      .state('account.offers',{
        templateUrl: 'app/account/manageAccount/manageOffers.html',
        controller: 'ManageOffersCtrl'
      })

      .state('login', {
        url: '/logins',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
  });