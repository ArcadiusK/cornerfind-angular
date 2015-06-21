'use strict';

angular.module('cornerfindApp')
  .controller('ProductsCtrl', function ($state, $scope, Auth, $stateParams) {
    if(!Auth.isLoggedIn()){
        return $state.go('login')
    }

    
    $scope.$on('checkout',function(event,data){
    	$scope.prodId = data.id;
    	$scope.stateName = data.state;
    })

    $scope.$on('submitted',function(){
    	$scope.submitted = true;
    })

  });
