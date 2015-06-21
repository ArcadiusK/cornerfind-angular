'use strict';

angular.module('cornerfindApp')
	.controller('ManageAccountCtrl',function($scope, Auth,User, $state){
		$scope.hello= 'Hello';
		$scope.currentUser = Auth.getCurrentUser();


		$scope.isActive = function(inputState){
			return inputState === $state.current.name;
		}

		// $scope.isMobile = function(){
		// 	if($scope.windowWidth<=768){
		// 		return 's12 m6 l6';
		// 	} return 's2 m2 l2';
		// }
	})