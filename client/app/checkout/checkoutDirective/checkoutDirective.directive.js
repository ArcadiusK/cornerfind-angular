'use strict';

angular.module('cornerfindApp')
    .directive('checkoutd', function(User, $location) {
        return {
            templateUrl: 'app/checkout/checkoutDirective/checkoutDirective.html',
            restrict: 'EA',
            scope: {
                product: '=',
                showtoken: '=',
                user: '=',
                stripeResponseHandler: "&",
                buttonText: '@',
                saveOrder: '&',
                offerPrice: '='
            },
            link: function(scope, element, attrs) {

                    Stripe.setPublishableKey('pk_test_HrMktfRjskOsJMw8RBnfca6X');

                    scope.checkout = function() {
                        var ccArr = scope.ccinfo.expiry.split('/');
                        scope.ccinfo.exp_month = ccArr[0];
                        scope.ccinfo.exp_year = ccArr[1];
                        Stripe.card.createToken(scope.ccinfo, stripeResponseHandler);

                        return true;

                    };

                    function stripeResponseHandler(status, response) {
                        if (response.error) {
                            // show the errors on the form
                            scope.errorMessage = response.error.message;

                            scope.$apply();
                        } else {
                            console.log('STRIPE RESPONSE ',response)
                            // token contains id, last4, and card type
                            scope.user.billing.cardType = response['card']['brand'];
                            scope.user.billing.last4 = response['card']['last4'];
                            scope.user.billing.stripeToken = response['id'];
                            scope.showtoken = false;
                            User.update(scope.user)
                                .$promise.then(function(user) {
                                    scope.saveOrder({offerPrice:scope.offerPrice})
                                });
                        }
                    }


                } //END OF LINK
        };
    });