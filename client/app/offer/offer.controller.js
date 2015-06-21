'use strict';

angular.module('cornerfindApp')
  .controller('OfferCtrl', function ($scope, $stateParams, offer, Auth) {

    $scope.user = Auth.getCurrentUser().$promise.then(function (user) {
    $scope.offers = offer.resource.getBuyersOffers({id: user._id});
    });

    
    $scope.cancelOffer = function(param){
    	offer.resource.delete({id:param._id},function(res,err){
    		var index = $scope.offers.indexOf(param);
    		$scope.offers.splice(index,1);
    	})
    }

    $scope.modifyOffer = function(obj){
        // Depopulating the model before sending to backend
        // otherwise it will error on save
        //ifs are in case it's modified multiple times in one session
        if(typeof obj.sellerId === 'object'){
            obj.sellerId = obj.sellerId._id;
        };

        for(var i = 0;i<obj.lineItems.length;i++){
            if(typeof obj.lineItems[i].productId==='object'){
                obj.lineItems[i].productId = obj.lineItems[i].productId._id;
            }
        };
        //removing version to prevent errors on multiple modifications
        delete obj.__v; 

        offer.resource.updateOffer({id:obj._id},obj,function(res,err){
            // console.log('RES ',res, err)
      
        });
    }

  });
