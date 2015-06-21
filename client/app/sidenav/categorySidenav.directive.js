'use strict';

angular.module('cornerfindApp')
    .directive('categorysidenav', function($mdSidenav) {
        return {
            templateUrl: 'app/sidenav/categorySidenav.html',
            restrict: 'EA',
            scope: {selection:'=',
        			onItemClick: "&",
        			buttonText :'@',
                    activeCategories: '='
        			},
            link: function(scope, element, attrs) {
                  scope.id = scope.sidebarid;
            	  scope.openLeftMenu = function() {
                    $mdSidenav("categories").toggle();
                };
                scope.toggleActive =function(category){
                if(scope.activeCategories.indexOf(category)!==-1){
                    // console.log("FIRED")
                    return 'purple accent-1 z-depth-2';
                }
              }




            },
            controller: function($scope) {
              
            }
        }
    });