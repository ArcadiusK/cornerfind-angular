'use strict';

angular.module('cornerfindApp')
    .factory('offer', function($resource) {
        var order = {};
        
        return {

            setOrder: function(orderObject) {
                order = orderObject;
            },
            getOrder: function() {
                return order;
            },
            addToOrder:function(object){
                for(var key in object){
                    if(object.hasOwnProperty(key)){
                        order[key]=object[key]
                    }
                }
            },

            resource: $resource('/api/orders/:id/:trackingUrl/:offers', {
                    id: '@_id'
                },

                {
                    getBuyersOffers: {
                        isArray: true,
                        method: 'GET',
                        params: {
                            id: '@id',
                            offers: 'offers'
                        }
                    },
                    getAcceptedOffer: {
                        // isArray:true,
                        method: 'GET',
                        params: {
                            id: '@id',
                            offers: 'getAccepted'
                        }
                    },
                    charge: {
                        method: 'POST',
                        params: {
                            offers: 'charge'
                        }
                    },
                    manageOffers: {
                        isArray: true,
                        method: 'GET',
                        params: {
                            id: '@id',
                            offers: 'manageOffers'

                        }
                    },

                    acceptOffer: {
                        method: 'GET',
                        params: {
                            id: '@id',
                            trackingUrl: '@url',
                            offers: 'acceptOffer'
                        }
                    },
                    updateOffer: {
                        method: 'PUT',
                        params: {
                            id: '@id'
                        }
                    }
                })
        }
    });