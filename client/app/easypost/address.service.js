'use strict';

angular.module('cornerfindApp')
    .factory('Address', function($resource) {
        return $resource('/api/address/:id/:controller', {id: '@_id'}, {

            updateAddress: {
            	method: 'PUT',
            	params: {
            		id: '@id'
            	}
            },
            getUserAddresses:{
                method: "GET",
                isArray: true,
                params: {
                    id: '@id',
                    controller: 'shipping'
                }
            }
        })
    });