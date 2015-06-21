'use strict';

angular.module('cornerfindApp')
    .directive('brandsidenav', function($mdSidenav) {
        return {
            templateUrl: 'app/sidenav/brandSidenav.html',
            restrict: 'EA',
            scope: {selection:'=',
        			onItemClick: "&",
        			buttonText :'@'
        			},
            link: function(scope, element, attrs) {
                  scope.id = scope.sidebarid;
            	  scope.openLeftMenu = function() {
                    $mdSidenav('brands').toggle();
                };
            },
            controller: function($scope) {
            }
        }
    });