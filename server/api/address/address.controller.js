'use strict';

var _ = require('lodash');
var Address = require('./address.model');
var ObjectId = require('mongoose').Types.ObjectId; 

// Get list of addresss
exports.index = function(req, res) {
  Address.find(function (err, addresss) {
    if(err) { return handleError(res, err); }
    return res.json(200, addresss);
  });
};

// Get a single address
exports.show = function(req, res) {
  Address.findOne({userId: new ObjectId(req.params.id)}, function (err, address) {
    if(err) { return handleError(res, err); }
    if(!address) { return res.send(404); }
    return res.json(address);
  });
};

// Creates a new address in the DB.
exports.create = function(req, res) {
  Address.create(req.body, function(err, address) {
    if(err) {return handleError(res, err); }
    return res.json(201, address);
  });
};

// Updates an existing address in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Address.update({userId: req.params.id},req.body,{upsert: true},(function(err,address){
    if(err) {return handleError(res, err); }
    if(!address) { return res.send(404); }
    return res.json(200,address);
    })
  )
};

// Deletes a address from the DB.
exports.destroy = function(req, res) {
  Address.findById(req.params.id, function (err, address) {
    if(err) { return handleError(res, err); }
    if(!address) { return res.send(404); }
    address.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Get all of a user's addresses
exports.userShippingAddresses = function(req, res) {
  Address.find({userId: new ObjectId(req.params.id), billing: false}, function (err, address) {
    if(err) { return handleError(res, err); }
    if(!address) { return res.send(404); }
    res.json(address);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}