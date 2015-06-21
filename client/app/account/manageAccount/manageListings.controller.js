'use strict';

angular.module('cornerfindApp')
	.controller('ManageListingsCtrl',function($scope, products) {
		// Need to display all products belonging to this user
		products.resource.getUsersListings({id:$scope.currentUser._id},
			function(res, err){
				$scope.usersListings = res;
			});
		
		$scope.submitProductChanges = function(obj){
			products.resource.update({id:obj._id},obj,function(){
				// console.log("submitProductChanges fired with: ",obj)
				$scope.submitted = true;
			})

		}


	})