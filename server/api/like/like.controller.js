'use strict';

var _ = require('lodash');
var Like = require('./like.model');
var ObjectId = require('mongoose').Types.ObjectId; 

// Get list of likes
exports.index = function(req, res) {
  Like.find(function (err, likes) {
    if(err) { return handleError(res, err); }
    return res.json(200, likes);
  });
};

// Get a single like
exports.show = function(req, res) {
  Like.findById(req.params.id, function (err, like) {
    if(err) { return handleError(res, err); }
    if(!like) { return res.send(404); }
    return res.json(like);
  });
};

// Creates a new like in the DB.
exports.create = function(req, res) {
  Like.create(req.body, function(err, like) {
    if(err) { return handleError(res, err); }
    return res.json(201, like);
  });
};

// Updates an existing like in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Like.findById(req.params.id, function (err, like) {
    if (err) { return handleError(res, err); }
    if(!like) { return res.send(404); }
    var updated = _.merge(like, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, like);
    });
  });
};

// Deletes a like from the DB.
exports.destroy = function(req, res) {
  Like.findById(req.params.id, function (err, like) {
    if(err) { return handleError(res, err); }
    if(!like) { return res.send(404); }
    like.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Gets all the likes from a certain user.
exports.getUserLikes = function(req, res) {
  Like.find({userId: new ObjectId(req.params.id)}, function (err, userLikes) {
    if(err) { return handleError(res, err); }
    if(!userLikes) { return res.send(404); }
    return res.json(userLikes);
  });
};

// Gets all the likes from a certain user.
exports.getProductLikes = function(req, res) {
  Like.find({productId: new ObjectId(req.params.id)}).populate('userId').exec(function (err, productLikes) {
    if(err) { return handleError(res, err); }
    if(!productLikes) { return res.send(404); }
    console.log(productLikes);
    return res.json(productLikes);
  });
};


// Deletes a like
exports.deleteLike = function(req, res) {
  Like.findOneAndRemove({productId: new ObjectId(req.body.productid), userId: new ObjectId(req.body.userid)}, function (err, like) {
    if(err) { return handleError(res, err); }
  
    return res.send(204);
    });
};



function handleError(res, err) {
  return res.send(500, err);
}