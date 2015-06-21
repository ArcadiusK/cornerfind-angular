'use strict';

angular.module('cornerfindApp')
    .factory('Like', function($resource) {
        return $resource('/api/likes/:id/:option', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            remove: {
                method: 'DELETE'
            },
            getUserByName: {
                method: 'GET',
                params: {
                    option: 'products'
                }
            }
            // ,
            // getLikes: {
            //     method: 'GET',
            //     params: {
            //         option: 'products'
            //     }
            // },
            // add: {
            //     method: 'POST',
            //     params: {
            //         option: 'products'
            //     }
            // },
            // showRec: {
            //    method: 'GET'
            // }
        });
    });
