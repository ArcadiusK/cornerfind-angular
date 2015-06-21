'use strict';

angular.module('cornerfindApp')
	.directive('manageListingCard',function(){
		return {
			templateUrl: "app/account/manageAccount/manageListing.card.html",
			restrict: 'EA',
			scope:{
				listing: '=info',
				editProduct: '&'
			},
			link: function(scope,element,attrs){
				scope.submitted = false;
				scope.submitButton = function(){
					scope.submitted=true;
				}
			}

		}
	})