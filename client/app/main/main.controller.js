'use strict';

angular.module('cornerfindApp')

    .controller('MainCtrl', function($scope, Auth, $location, $http, socket, products, brand, category, $window, eventEmitter) {
        $scope.productList = products.resource.query();
        $scope.brandList = brand.query();
        $scope.categoryList = category.query();
        $scope.currentUser = Auth.getCurrentUser();
        $scope.loggedin = Auth.isLoggedIn();

        console.log($scope.loggedin);

  $(document).ready(function(){
      $('.slider').slider({full_width: false});
    });

        $scope.searchSubmit = function(searchText) {
            if(searchText == ''){
                $scope.productList = products.resource.query();
            }
          console.log('inside searchSubmit');
            products.resource.search({
                   //searchtext: searchText
                   id: searchText
                }).$promise
                .then(function(results) {
                   //$scope.results = results;
                   $scope.productList = results;
                    console.log('results: ', results);
                    //if ($scope.results.data.length === 1) {
                      if ($scope.results.length === 1) {
                        console.log('There was only one object found..');
                 //   } else if ($scope.results.data.length > 1) {
                     } else if ($scope.results.length > 1) {
                        console.log('There was more than one object found!');

                    }
                    toast('Search complete', 2000);
                })
                .catch(function(err) {
                    console.log('There was an error in search', err);
                });
        };

        $scope.addProduct = function (userId) {
             $location.path('/users/' + $scope.currentUser._id+'/add');
        };

        // EventEmitter code
        eventEmitter.subscribeEvent('category', function (selected) {
             console.log('selected filter is', selected);
             $scope.productList = products.resource.getFiltered({type:'category',name: selected});
        });

         eventEmitter.subscribeEvent('brand', function (selected) {
             console.log('selected filter is', selected);
             $scope.productList = products.resource.getFiltered({type:'brand' ,name: selected});
        });

         eventEmitter.subscribeEvent('gender', function (selected) {
             console.log('selected filter is', selected);
             $scope.productList = products.resource.getFiltered({type:'gender' ,name: selected});
        });

    });

