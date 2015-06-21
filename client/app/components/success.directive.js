'use strict';

angular.module('cornerfindApp')
    .directive('successConfirmation', function() {
        return {
            templateUrl: "/app/components/success.view.html",
            restrict: 'EA',
            scope: {
                text: "@"
                // success: "="
            },
            link: function(scope, element, attrs) {
                // scope.toggleSuccess = function() {
                //     if (typeof scope.success === 'undefined' || $scope.success === false) {
                //         scope.success = true;
                //     } else {
                //         scope.success = false;
                //         scope.$apply();
                //     }
                // }
                // $scope.successPopup = function() {
                //     scope.toggleSuccess()
                //     var changeBack = _.debounce($scope.toggleSuccess, 3000)
                //     changeBack();
                // }
                // scope.successPopup();
            }

        }
    })