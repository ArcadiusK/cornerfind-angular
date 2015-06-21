'use strict';

angular.module('cornerfindApp')
    .directive('conditionsidenav', function($mdSidenav) {
        return {
            templateUrl: 'app/sidenav/conditionSidenav.html',
            restrict: 'EA',
            scope: {selection:'=',
        			onItemClick: "&",
        			buttonText :'@'
        			},
            link: function(scope, element, attrs) {
                  scope.id = scope.sidebarid;
            	  scope.openLeftMenu = function() {
                    $mdSidenav("conditions").toggle();
                    
                };


            },
            controller: function($scope) {
              
            }
        }
    });