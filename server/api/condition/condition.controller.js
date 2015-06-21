'use strict';

var _ = require('lodash');
var Condition = require('./condition.model');

// Get list of conditions
exports.index = function(req, res) {
  Condition.find(function (err, conditions) {
    if(err) { return handleError(res, err); }
    return res.json(200, conditions);
  });
};

// Get a single condition
exports.show = function(req, res) {
  Condition.findById(req.params.id, function (err, condition) {
    if(err) { return handleError(res, err); }
    if(!condition) { return res.send(404); }
    return res.json(condition);
  });
};

// Creates a new condition in the DB.
exports.create = function(req, res) {
  Condition.create(req.body, function(err, condition) {
    if(err) { return handleError(res, err); }
    return res.json(201, condition);
  });
};

// Updates an existing condition in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Condition.findById(req.params.id, function (err, condition) {
    if (err) { return handleError(res, err); }
    if(!condition) { return res.send(404); }
    var updated = _.merge(condition, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, condition);
    });
  });
};

// Deletes a condition from the DB.
exports.destroy = function(req, res) {
  Condition.findById(req.params.id, function (err, condition) {
    if(err) { return handleError(res, err); }
    if(!condition) { return res.send(404); }
    condition.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}