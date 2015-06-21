'use strict';

angular.module('cornerfindApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('offer',{
				url:'/offers/:userId', 
				templateUrl: 'app/offer/offer.html',
				controller: "OfferCtrl"
			})
	})