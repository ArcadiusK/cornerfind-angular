'use strict';

angular.module('cornerfindApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products',{
        url: '/products',
        templateUrl: 'app/products/products.html',
        controller: 'ProductsCtrl'
      })
      .state('products.oneProductView', {
        url: '/:id',
        templateUrl: 'app/products/oneProductView/oneProductView.html',
        controller: 'OneProductViewCtrl'
     })
      .state('products.stripeInfo',{
        url: '/:id',
        templateUrl: 'app/products/stripeForm.html',
        controller: 'StripeFormCtrl'
      })
      .state('products.addressForm',{
        url: '/:id',
        templateUrl: 'app/easypost/easypost.html',
        controller: 'EasypostCtrl'
      })
      .state('products.confirmOrder',{
        url: '/:id',
        templateUrl: 'app/products/confirmOrder.html',
        controller: 'ConfirmOrderCtrl'
      })
  });
