'use strict';

var _ = require('lodash');
var Product = require('./product.model');
var User = require('../user/user.model');

// Get list of products
exports.index = function(req, res) {

  Product.find().populate('userId').populate('likes').exec(function(err,products){
    if(err) {return handleError(res,err)};
    if(!products){return res.send(404); }
      return res.json(products);
  })
};

// Get a single product
exports.show = function(req, res) {

  Product.findById(req.params.id).populate('userId')
  .exec(function(err,product){
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    return res.json(product);
  });
};

// Get filtered products
exports.filtered = function(req, res) {

  var type = req.body.type;
  var name = req.body.name;
  Product.find().where(type,name).populate('userId')
  .exec(function(err,product){
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    return res.json(product);
  });
};



// Creates a new product in the DB.
exports.create = function(req, res) {
  Product.create(req.body, function(err, product) {
    if(err) { return handleError(res, err); }
    User.findById(product.userId, function(err, user) {
            if (err) {
                return handleError(res, err);
            }
            user.listedProducts.push(product._id)
            user.save(function(err, user) {})
        });
    return res.json(201, product);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  console.log('PRODUCT UPDATE API HIT')
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    var updated = _.merge(product, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, product);
    });
  });
};


// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    product.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

//Get all of a user's listings
exports.getUsersListings = function(req,res){
  Product.find({userId:req.params.id}).populate('userId')
  .exec(function(err,product){
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    return res.json(product);
  });
};

// Searches for producs from a specific brand from the DB
exports.search = function(req, res) {
    var searchtext = req.params.query;
    console.log("req.params: ",req.params);
    console.log('.......Backend searchtext is', searchtext)

    Product.find({
            $text: {
                $search: searchtext
            }
        }, {
            score: {
                $meta: "textScore"
            }
        })
        .sort({
            score: {
                $meta: 'textScore'
            }
        })
        .exec(function(err, results) {
            if (err) console.log(err);
            if (!results) return res.send(440);
            console.log('backend search results are...', results)
            // var obj = {};
            // obj.data = results;
            // res.json(obj);
            res.json(results);
        })
}

function handleError(res, err) {
  return res.send(500, err);
}
