'use strict';

angular.module('cornerfindApp')
    .directive('manageOfferView', function(review) {
        return {
            templateUrl: "app/account/manageAccount/manageOffer.card.html",
            restrict: 'EA',
            scope: {
                offer: '=info',
                currentUser: '=',
                status: '=',
                stripeResult: '=',
                acceptOffer: '&'
                // submitReview: '&'
            },
            link: function(scope, element, attrs) {
                scope.accepted = false;

                scope.submitButton = function() {
                    scope.charged = true;
                     scope.accepted = true;
                }

                scope.showReview = false;
          

                scope.review = function() {
                    scope.showReview = true;
                }

                scope.newReview = {
                    reviewedUserId: scope.offer.buyerId._id,
                    reviewingUserId: scope.offer.sellerId._id,
                    text: "",
                    rating: 0,
                    date: new Date()
                }
                scope.maxStars = [1, 2, 3, 4, 5];

                scope.starClasses = ["", "", "", "", ""];
                scope.setStars = function(num) {
                    scope.newReview.rating = num;
                    for (var i = 0; i < num; i++) {
                        scope.starClasses[i] = "star-color";
                    }
                    for (var i = num; i < 5; i++) {
                        scope.starClasses[i] = "";
                    }
                    
                }
                scope.submitReview = function () {
                	// console.log('FIRED')
                	scope.newReview.text = scope.reviewText;
                    review.resource.save(scope.newReview, function (res,err) {
                    // console.log("REVIEW CLLBACK",res,err)
                    toast('Review submitted!', 3000);
                    });
                }
                scope.$on("success",function(){
                    console.log('Success LISTENER')
                    toast('Success!',3000);
                    scope.reviewable=true;
                })
            }

        }
    })