'use strict';

angular.module('cornerfindApp')
    .controller('OneProductViewCtrl', function($rootScope,$scope, Auth, User, Address, products, chat, $stateParams, offer, $cookieStore, $location, $state) {

        $scope.currentUser = Auth.getCurrentUser();
        if (typeof $scope.currentUser._id !== 'undefined') {
            Auth.getCurrentUser().$promise.then(function(user) {
                console.log('USER ',user)
                if (user.billing.stripeToken !== null) {
                    $scope.currentUser = user;
                } else {
                    $scope.currentUser = user;
                }
            })
        };

        products.resource.get({
            id: $stateParams.id
        }).$promise.then(function(product) {
            $scope.product = product;
        });

        chat.getChatList($stateParams.id).then(function(data) {
            $scope.chatlist = data;
        });

        $scope.isMobile = function(width) {
            return width <= 992;
        }

        
        $scope.isPinned = function(width) {
            if (!$scope.isMobile(width) && !$scope.showAddressForm) return 'pinned';
        }

        $scope.submitOffer = function(offerPrice) {

            var prod = $scope.product;
            $scope.isOffering = !$scope.isOffering;
            var orderForCreation = {
                lineItems: [{
                    //This ONLY handles single items as is, will need to be modified for bundling
                    productId: prod._id,
                    name: prod.name,
                    purchasePrice: offerPrice,
                    originalPrice: prod.price
                }],
                sellerId: prod.userId._id,
                buyerId: $scope.currentUser._id,
                status: 'offer'
            }

            // offer.setOrder(orderForCreation);
            $cookieStore.put("order",orderForCreation);
            
            if ($scope.currentUser.billing.stripeToken === null) {
                $scope.$emit('checkout',{id: $stateParams.id, state:$state.current.name});
                return $state.go('products.stripeInfo', {id: $stateParams.id});
            } else {
                // offer.addToOrder($scope.currentUser.billing);


                $cookieStore.put("cardInfo",$scope.currentUser.billing);

                //Now need to check if they have a listed address too
                //to see which state to go to
                Address.getUserAddresses({
                        id: $scope.currentUser._id
                    }, function(res) {

                        //Currently hardcoded for one address
                        //this could cause problems with editing addresses
                        //if we fetch the wrong one
                        $cookieStore.put('shippingAddress',res[0])
                        $scope.$emit('checkout',{id: $stateParams.id, state:$state.current.name})
                        $state.go("products.confirmOrder",{id: $stateParams.id})
                    }, function(err) {
                        console.log("ERR", err)
                    }
                )
            }
        }


        // $scope.buyNow = function() {
        //     //SHOWS CHECKOUT DIRECTIVE IF USER DOES NOT HAVE A TOKEN ALREADY
        //     if ($scope.currentUser.billing.stripeToken == null) {
        //         $scope.showtoken = true;
        //         return;
        //     }

        //     var prod = $scope.product;
        //     $scope.isOffering = !$scope.isOffering;

        //     var orderForCreation = {
        //         lineItems: [{
        //             //This ONLY handles single items as is, will need to be modified for bundling
        //             productId: prod._id,
        //             name: prod.name,
        //             purchasePrice: $scope.product.price,
        //         }],
        //         sellerId: prod.userId._id,
        //         buyerId: $scope.currentUser._id,
        //         status: 'accepted'
        //     }
        //     offer.save(orderForCreation, function(result) {}, function(err) {
        //         if (err) {
        //             console.log('Error ', err)
        //         };

        //     })

        //     // Create digestible stripe order
        //     $scope.stripeOrder = {
        //         stripeToken: $scope.currentUser.billing.stripeToken,
        //         orderTotal: $scope.product.price
        //     }

        //     offer.charge($scope.stripeOrder).$promise.then(function(result) {

        //         if (result.$resolved) {
        //             $scope.boughtItem = true;

        //         }
        //     })




        // }

        $scope.userRedirect = function() {
            $location.path('/users/' + $scope.product.userId.username);
        }



    });