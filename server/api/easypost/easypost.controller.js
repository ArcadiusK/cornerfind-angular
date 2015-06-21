'use strict';

var _ = require('lodash');
var Easypost = require('./easypost.model');
var apiKey = 'GENUIa8BDratncdUb5NmJg';
var easypost = require('node-easypost')(apiKey);

// Get list of easyposts
exports.index = function(req, res) {
    Easypost.find(function(err, easyposts) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, easyposts);
    });
};

// Get a single easypost
exports.show = function(req, res) {
    Easypost.findById(req.params.id, function(err, easypost) {
        if (err) {
            return handleError(res, err);
        }
        if (!easypost) {
            return res.send(404);
        }
        return res.json(easypost);
    });
};

// Creates a new easypost in the DB.
exports.verify = function(req, res) {
    // verify address
    easypost.Address.create(req.body.fromAddress, function(err, fromAddress) {

        fromAddress.verify(function(err, response) {
            if (err) {
                console.log('Address is invalid.');
                var verifiedAddress = 'Address is invalid'
            } else if (response.message !== undefined && response.message !== null) {
                console.log('Address is valid but has an issue: ', response.message);
                var verifiedAddress = response.address;
                return res.send(response.message);
            } else {
                var verifiedAddress = response;
            }
            console.log(verifiedAddress.address);
            return res.send(verifiedAddress);
        })
    });

    // Easypost.create(req.body, function(err, easypost) {
    //   if(err) { return handleError(res, err); }
    //   return res.json(201, easypost);
    // });
};

// Creates a new label in the DB.
exports.createLabel = function(req, res) {
    // set parcel
    // easypost.Parcel.create({
    //     predefined_package: "FlatRateEnvelope",
    //     weight: 10
    // }, function(err, response) {
    //     // console.log('PARCEL ', response)
    //     console.log(err);
    //     });
    var parcel = {
        length: 10.2,
        width: 7.8,
        height: 4.3,
        weight: 21.2
    };


    
////REFERENCE DO NOT DELETE
    // var toAddress = {
    //     name: "Justin Cohen",
    //     street1: "165 W 91 St",
    //     street2: 'Apt 3H',
    //     city: "New York",
    //     state: "NY",
    //     zip: "10024",
    //     country: "US",
    //     phone: "780-123-4567"
    // };
    // var fromAddress = {
    //     name: "David Chang",
    //     street1: "980 FOX HILL LN",
    //     city: "SCOTCH PLAINS",
    //     state: "NJ",
    //     zip: "07076",
    //     phone: "415-123-4567"
    // };


    // create shipment
    easypost.Shipment.create({
        to_address: req.body.toAddress,
        from_address: req.body.fromAddress,
        // to_address:toAddress,
        // from_address: fromAddress,
        parcel: parcel
        // customs_info: customsInfo
    }, function(err, shipment) {
        // buy postage label with one of the rate objects
        shipment.buy({
            rate: shipment.lowestRate(['USPS'])
        }, function(err, shipment) {

            console.log('Easypost ERR ', err)
            // console.log('Shipment ', shipment)

            // console.log(shipment.tracking_code);
            // console.log(shipment.postage_label.label_url);
            return res.json(200, shipment);
        });
    });

}

// Updates an existing easypost in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Easypost.findById(req.params.id, function(err, easypost) {
        if (err) {
            return handleError(res, err);
        }
        if (!easypost) {
            return res.send(404);
        }
        var updated = _.merge(easypost, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, easypost);
        });
    });
};

// Deletes a easypost from the DB.
exports.destroy = function(req, res) {
    Easypost.findById(req.params.id, function(err, easypost) {
        if (err) {
            return handleError(res, err);
        }
        if (!easypost) {
            return res.send(404);
        }
        easypost.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}