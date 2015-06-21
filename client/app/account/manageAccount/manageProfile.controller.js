angular.module('cornerfindApp')
	.controller('ManageProfileCtrl',function($scope, Auth, User){
		$scope.currentUser = Auth.getCurrentUser();
		$scope.master ={};
		//For form Reset
		angular.copy($scope.currentUser,$scope.master)

		$scope.updateUser = function(userObject){
			User.update(userObject._id,userObject,function(res){
				$scope.success = true;
			})
		}

		$scope.cancelChanges = function(){
			angular.copy($scope.master,$scope.currentUser)
		}

	})