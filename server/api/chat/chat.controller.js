'use strict';

var _ = require('lodash');
var Chat = require('./chat.model');
var ObjectId = require('mongoose').Types.ObjectId;
var Firebase = require("firebase");
var ref = new Firebase('https://cornerfind.firebaseio.com/chats');
var twilioClient = require('twilio')();
var User = require('../user/user.model');
var mandrill = require('mandrill-api/mandrill');
var mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);
var async = require('async');


var sendSMS = function(paramPhone, paramUsername, paramComment) {
    twilioClient.messages.create({
        body: "CornerFind.com comment from " + paramUsername + ": " + paramComment,
        to: paramPhone,
        from: "+16506845431"
    }, function(err, message) {
        console.log("SMS sent successfully");
    });
}

var sendEmail = function(arrayOfEmailAddressToSendTo, nameTo, whoMentioned, commentLine) {
    var mandrillParams = {
        "message": {
            "from_name": "CornerFind.com",
            "from_email": "sayHello@cornerfind.com",
            "to": arrayOfEmailAddressToSendTo,
            "subject": "You have been mentioned in chat by " + whoMentioned,
            "text": "Hi " + nameTo + ",\n \nYou have been mentioned in the following comment by " + whoMentioned + ":" +
                "\n \n" + commentLine + "\n \nBest,\nCornerFind.com Team\nsayHello@CornerFind.com"
        }
    };

    mandrillClient.messages.send(mandrillParams, function(res) {
        console.log("mandrill response: ", res);
    }, function(err) {
        console.log("mandrill error: ", err);
    })
};




// Get list of chats
exports.index = function(req, res) {
    console.log('req.params.product: ', req.params.productid)
    Chat.find({
        product: new ObjectId(req.params.productid)
    }, function(err, chats) {
        if (err) {
            return console.log("chat controller exports.index Res, err: ", res, err);
        }
        // console.log('chat results backend', chats, req.params.productid);
        return res.json(201, chats);
    });
};

// Get a single chat
exports.show = function(req, res) {
    Chat.findById(req.params.id, function(err, chat) {
        if (err) {
            return console.log("chat controller exports.show Res, err: ", res, err);
        }
        if (!chat) {
            return res.send(404);
        }
        return res.json(chat);
    });
};

// Creates a new chat in the DB.
exports.create = function(req, res) {

    var chatRef = ref.child(req.body.productID);
    chatRef.push(req.body.newChat);

    var regexPattern = /\@\w+/gm;
    var arrayOfUsernames = req.body.newChat.textLine.toLowerCase().match(regexPattern);
    console.log("arrayOfUsernames before de-duplication: ", arrayOfUsernames);

    // this will de-duplicate usernames in the array
    if (arrayOfUsernames) {
        arrayOfUsernames = arrayOfUsernames.filter(function(name, pos) {
            return arrayOfUsernames.indexOf(name) === pos;
        })
        console.log("arrayOfUsernames AFTER de-duplication: ", arrayOfUsernames);
    }


    if (arrayOfUsernames) {
        async.each(arrayOfUsernames, function(ausername, done) {
            console.log("quering username: " + ausername.substring(1, ausername.length) + " to find user");
            User.findOne({
                    username: ausername.substring(1, ausername.length)
                }, function(err, auser) {
                    if (err) {
                        return console.log("Error finding user: ", res, err);
                    }


                    if (auser) {
                        console.log('found in database the following user from chat line: ', auser.name);

                        if (typeof auser.phoneNumber !== 'undefined') {
                            if (auser.phoneNumber.length >= 10) {

                                console.log("sending SMS to: " + auser.phoneNumber + " with the following: ", req.body.newChat);
                                sendSMS(auser.phoneNumber, req.body.newChat.username, req.body.newChat.textLine);
                            } else {
                                console.log("Username: " + auser.username + " doesn't have a valid phone number, so doing nothing.")
                            }
                        } else {
                            console.log("Username: " + auser.username + " doesn't have a phone number, so doing nothing.")
                        }

                        console.log("sending email to: ", auser.email);
                        var arrayOfEmails = [];
                        arrayOfEmails.push({
                            "email": auser.email
                        })
                        sendEmail(arrayOfEmails, auser.name, req.body.newChat.username, req.body.newChat.textLine);
                    }

                    done(); // done() should be called from here
                })
                // done() should NOT be called from here
        }, function(err) {
            if (err) return res.status(500, "Error 531288").send()
            console.log("sending response 201: created")
            res.send(201, "created");
        })
    } else {
        console.log("sending response 201: no emails no sms sent")
        res.send(201, "no emails no sms sent");
    }
}

// Updates an existing chat in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Chat.findById(req.params.id, function(err, chat) {
        if (err) {
            return handleError(res, err);
        }
        if (!chat) {
            return res.send(404);
        }
        var updated = _.merge(chat, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, chat);
        });
    });
};

// Deletes a chat from the DB.
exports.destroy = function(req, res) {
    Chat.findById(req.params.id, function(err, chat) {
        if (err) {
            return handleError(res, err);
        }
        if (!chat) {
            return res.send(404);
        }
        chat.remove(function(err) {
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
