'use strict';

angular.module('cornerfindApp')
    .controller('UsersCtrl', function($scope, products, Auth, User, chat, review, $stateParams, $timeout) {

        // Get logged in user object
        $scope.currentUser = Auth.getCurrentUser();

        // Set booleans for follow button text and showing review panel
        $scope.toggleText = 'Following';

        $scope.review = false;

        $scope.buttonText = 'Show Feedback'

        // Get user of current page
        User.getUserByName({
            username: $stateParams.name
        }, function(user) {
            $scope.user = user;

             // Get products listed by user
            products.resource.getUsersListings({id:$scope.user._id},
            function(res, err){
                
                $scope.productList = res;
                console.log('productList is..', $scope.productList)
            });

            // console.log('$scope.currentUser.following is ...', $scope.currentUser.following);

            $scope.reviews = review.resource.query({id:$scope.user._id});
            if ($scope.currentUser.following.indexOf($scope.user._id) !== -1) {
                $scope.followed = true;
                $scope.toggleText = 'Following';
           
            } else {
                $scope.followed = false;
                $scope.toggleText = 'Follow';
            
            }
        })

        $scope.showReviews = function () {
            $scope.review = !$scope.review;

            if ($scope.review) {
                $scope.buttonText = 'Hide Feedback'
            }
            else if (!$scope.review) {
                $scope.buttonText = 'Show Feedback'
            }
        }


        $scope.toggleFollow = function() {

            // If already following do this
            if ($scope.followed) {


                // Update logged in user's following Array
                $scope.currentUser.following.splice($scope.currentUser.following.indexOf($scope.user._id), 1)
                
                $timeout(function() {
                    User.update($scope.currentUser)
                        .$promise.then(function(user) {
                         
                            $scope.followed = false;
                            $scope.toggleText = 'Follow';
                            $scope.$apply;
                        });
                }, 1000);


                $scope.user.followers.splice($scope.user.followers.indexOf($scope.currentUser._id), 1)
                    // Update the user of the page's followers array
                User.update($scope.user)
                    .$promise.then(function(user) {
                        toast('Unfollowed',4000);
                    });

            }
            // If not following yet do this
            else {

                // Update logged in user's following Array
                $scope.currentUser.following.push($scope.user._id)
                User.update($scope.currentUser)
                    .$promise.then(function(user) {
                          toast('Following',4000);
                        $scope.followed = true;
                        $scope.toggleText = 'Following';
                        $scope.$apply;
                    });

                // Update the user of the page's followers array
                $scope.user.followers.push($scope.currentUser._id)
                User.update($scope.user)
                    .$promise.then(function(user) {
                        console.log('Follower pushed to users followers array ..', user)
                    });

            }
        }

        //Responsiveness functions
        $scope.isMobile = function(width) {
            return width <= 992;
        }

         $scope.isPinned = function(width) {
            if (!$scope.isMobile(width) && !$scope.showAddressForm) return 'pinned';
        }


    });