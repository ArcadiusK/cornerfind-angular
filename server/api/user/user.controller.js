'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var validationError = function(res, err) {
    return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword', function(err, users) {
        if (err) return res.send(500, err);
        res.json(200, users);
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({
            _id: user._id
        }, config.secrets.session, {
            expiresInMinutes: 60 * 5
        });
        res.json({
            token: token
        });
    });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
        res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return res.send(500, err);
        return res.send(204);
    });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return validationError(res, err);
                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.json(401);
        res.json(user);
    });
};


/**
 * Get user by name AND populate products they have listed
 */
exports.profile = function(req, res, next) {
    var username = req.body.username;

    User.findOne({
            username: username
        }, '-salt -hashedPassword')
        .populate({
            path: 'listedProducts',
            model: 'Product'
        })
        .populate({
            path: 'followers',
            model: 'User'
        })
         .populate({
            path: 'following',
            model: 'User'
        })
        .exec(function(err, user) {
            User.populate(user, {
                path: 'following',
                model: 'User'
            }, function(err, user) {
                if (err) console.log(err);
                res.json(200, user);
            })
        })
};



// Updates an existing User in the DB.
exports.update = function(req, res) {
    var userObj = req.body; // { without following}
    var userId = req.body._id;
    // console.log('req.body is..', req.body);
    console.log('req.body.following is..', req.body.following);
    if (req.body._id) {
        delete req.body._id;
        delete req.body._v;
    }

    User.findById(userId, function(err, user) {
        var updated = _.assign(user, req.body);
        updated.markModified('following');
        updated.markModified('followers');
        updated.markModified('stripeToken');
      
        updated.save(function(err, updatedUser, numModified) {
            console.log("updatedUser", updatedUser);
            console.log('modified?', numModified);
          
                if (err) console.log(err);
            return res.json(200, user);
        });
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};