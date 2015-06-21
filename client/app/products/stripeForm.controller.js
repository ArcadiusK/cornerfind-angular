'use strict';

angular.module('cornerfindApp')
    .controller('StripeFormCtrl', function($stateParams, $scope, Auth,User,offer, $state, $cookieStore) {
    	$scope.currentUser = Auth.getCurrentUser();
        Stripe.setPublishableKey('pk_test_HrMktfRjskOsJMw8RBnfca6X');
        $scope.prodId = $stateParams.id;


        $scope.cancel = function(){
            $state.go('products')  //get the ID from state param
        }

        $scope.checkout = function() {
            var ccArr = $scope.ccinfo.expiry.split('/');
            $scope.ccinfo.exp_month = ccArr[0];
            $scope.ccinfo.exp_year = ccArr[1];
            Stripe.card.createToken($scope.ccinfo, stripeResponseHandler);
            return true;
        };

        function stripeResponseHandler(status, response) {
            if (response.error) {
                // show the errors on the form
                $scope.errorMessage = response.error.message;

                $scope.$apply();
            } else {
                console.log('STRIPE RESPONSE ', response)
                    // token contains id, last4, and card type
                $scope.currentUser.billing.cardType = response['card']['brand'];
                $scope.currentUser.billing.last4 = response['card']['last4'];
                $scope.currentUser.billing.stripeToken = response['id'];

                
                // offer.addToOrder($scope.currentUser.billing);


                User.update($scope.currentUser)
                    .$promise.then(function(user) {
                    	console.log('updated User ',user)
                        $cookieStore.put('cardInfo',$scope.currentUser.billing);
                        $scope.$emit('checkout',{id: $stateParams.id, state:$state.current.name})
                    	$state.go('products.addressForm',{id: $stateParams.id})
                    });
            }
        }





    });