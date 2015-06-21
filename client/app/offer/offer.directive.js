'use strict';

angular.module('cornerfindApp')
    .directive('yourOfferView', function(review, offer) {
            return {
                templateUrl: "app/offer/offer.directive.html",
                restrict: 'EA',
                scope: {
                    offer: '=',
                    modifyOffer: '&',
                    cancelOffer: '&'
                },
                link: function(scope, element, attrs) {

                    scope.statusCheck = {
                        status: ['accepted', 'shipped', 'received', 'issues']
                    };

                    scope.showReview = false;
                    scope.finished = false;

                    scope.review = function() {
                        scope.showReview = true;
                    }

                    scope.newReview = {
                        reviewedUserId: scope.offer.sellerId._id,
                        reviewingUserId: scope.offer.buyerId,
                        text: "",
                        rating: 0,
                        date: new Date(),
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
                        };
                    }
                    scope.submitReview = function() {

                        scope.newReview.text = scope.reviewText;
                        review.resource.save(scope.newReview, function(result) {
                            if (result) {
                                toast('Review submitted!', 4000);

                            }
                        });


                        // Update Offer object to reviewed equals true
                        offer.updateOffer({id: scope.offer._id}, {reviewed:true}, function(res, err) {
                                console.log("modify Success", res);
                               toast('Success!', 4000);
                               scope.finished = true;
                            })
                    }

                  }
                }})