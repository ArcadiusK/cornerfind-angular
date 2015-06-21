'use strict';

angular.module('cornerfindApp')
    .controller('EasypostCtrl', function($scope, $http, $cookieStore, Auth, Address, $state,$stateParams, offer) {
        $scope.verifyAddyResult;
        $scope.false = true;
        $scope.buttonText = 'Submit';
        $scope.buttonColor = '';
        $scope.currentUser = Auth.getCurrentUser();

        $scope.address = Address.get({
            id: $scope.currentUser._id
        });

        $scope.saveAddress = function() {
            toast('Confirming Address ...', 1500)
            if ($scope.buttonText == 'Submit') {


                $http.post('/api/easyposts/verify', {
                    fromAddress: $scope.address
                }).success(function(address, status) {
                    console.log('EASYPOST RESPONSE ',address)
                    if (typeof address ==='string') {
                        $scope.badAddress = true;
                        $scope.errorMessage = address;
                        return;
                    }

                    $scope.address = {
                        userId: $scope.currentUser._id,
                        name: address.address.name,
                        street1: address.address.street1,
                        street2: address.address.street2,
                        state: address.address.state,
                        zip: address.address.zip,
                        city: address.address.city,
                        phone: address.address.phone,
                        email: address.address.email
                    }

                    Address.updateAddress({
                        id: $scope.currentUser._id
                    }, $scope.address, null, function(results) {
                        // console.log('RESULTS ', results)
                        console.log('ARGS ', arguments)
                        // offer.addToOrder($scope.address)
                        $cookieStore.put('shippingAddress',$scope.address)
                        
                        $scope.$emit('checkout',{id: $stateParams.id, state:$state.current.name})
                        $state.go('products.confirmOrder',{id: $stateParams.id});
                    })

                })
            }
        }


        $scope.createLabel = function(buyerAddress, sellerAddress) {
            console.log(buyerAddress, SellerAddress);
            $http.post('/api/easyposts/createLabel', {
                to_Address: buyerAddress,
                from_address: sellerAddress
            }).success(function(results) {
                $scope.labelURL = results;
            });
        }

        $scope.resetAddy = function() {
            $scope.address = {};
            $scope.badAddress = false;

        }

    });