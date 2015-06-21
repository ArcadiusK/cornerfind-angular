'use strict';

angular.module('cornerfindApp')
  .controller('DropdownCtrl', function ($scope, $log) {
  	$scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  	];

  $scope.status = {
    openBrands: false,
    openCategories:false,
    openGenders:false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleBrands = function($event) {
    // $event.preventDefault();
    // $event.stopPropagation();
    $scope.status.openBrands= !$scope.status.openBrands;
  };
  
  $scope.toggleCategories = function($event) {
    // $event.preventDefault();
    $event.stopPropagation(); //Why does this line break the mobile dropdown?
    $scope.status.openCategories= !$scope.status.openCategories;
  };

    $scope.toggleGenders = function($event) {
    // $event.preventDefault();
    $event.stopPropagation(); //Why does this line break the mobile dropdown?
    $scope.status.openGenders = !$scope.status.openGenders;
  };
})