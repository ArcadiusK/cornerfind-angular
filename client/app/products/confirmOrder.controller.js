'use strict';

angular.module('cornerfindApp')
    .controller('ConfirmOrderCtrl', function($q, $scope, $state, offer, Auth, Address, $cookieStore) {
        $scope.currentUser = Auth.getCurrentUser();
        // $scope.order = offer.getOrder();
        //if get order returns things, add the cookie
        //otherwise pull the cookie that's already there
        $scope.order = $cookieStore.get('order');
        $scope.shippingAddress = $cookieStore.get('shippingAddress');
        $scope.cardInfo = $cookieStore.get('cardInfo')
        $scope.prodId = $scope.order.lineItems[0].productId;

        $scope.emitter = function() {
            $scope.$emit('checkout', {
                id: $scope.prodId,
                state: $state.current.name
            })
        };
        
        $scope.submitOrder = function() {

            $scope.clicked = true;

            var shipping = $scope.shippingAddress;
            var shippingAddress = {
                userId: $scope.currentUser._id,
                name: shipping.name,
                billing: false,
                street1: shipping.street1,
                street2: shipping.street2,
                city: shipping.city,
                state: shipping.state,
                zip: shipping.zip,
                phone: shipping.phone,
                country: 'US'
            }

            var order = $scope.order;

            //deleting for easypost
            delete shippingAddress.billing;
            delete shippingAddress.userId;
            var orderForCreation = {
                lineItems: order.lineItems,
                sellerId: order.sellerId,
                buyerId: order.buyerId,
                status: 'offer',
                buyerAddress: shippingAddress
            };

            

            offer.resource.save(orderForCreation, function(orderResult) {
                Address.updateAddress({
                    id: $scope.currentUser._id
                }, shippingAddress, null, function(addressResult) {
                    console.log('SUCCESS ', orderResult, addressResult);
                    $cookieStore.remove('order');
                    $cookieStore.remove('cardInfo');
                    $cookieStore.remove('shippingAddress');
                    $scope.orderId = orderResult._id;
                    $scope.$emit('submitted');
                    $scope.submitted = true;
                    
                })
            })



            //This setup isn't writing to DB, no time to troubleshoot
            //Doing it via callbacks for now
            // var orderDeferral = $q.defer();
            // var addressDeferral = $q.defer();

            // offer.resource.save(orderForCreation, function(result) {
            //     orderDeferral.resolve(result);
            // }, function(err) {
            //     if (err) {
            //         console.log('Error ', err)
            //     }
            // })

            // Address.updateAddress({
            //     id: $scope.currentUser._id
            // }, shippingAddress, null, function(results) {
            //     addressDeferral.resolve(results)
            //     console.log('APROMISE ', addressDeferral)
            // })

            // $q.all([orderDeferral.promise, addressDeferral.promise]).then(function(results) {
            //     $cookieStore.remove('order');
            //     $cookieStore.remove('cardInfo');
            //     $cookieStore.remove('shippingAddress');

            //     $scope.orderId = results[0]._id;

            //     // toast('Success!', 4000)
            //     $scope.$emit('submitted');
            //     $scope.submitted = true;
            // }, function(err) {
            //     console.log("ERROR ", err)
            // })
        }

    })