var express = require('express');

var AWS = require('aws-sdk');
var secrets = require('../../config/environment');

var s3 = new AWS.S3();
AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

//A sample route to receive
module.exports = function(req, res){
		console.log(req.query.s3_object_name)
    var s3 = new AWS.S3();
    var s3_params = {
    		//configure with your bucket name as a string
        Bucket: 'cornerfind',
        Key: req.query.s3_object_name,
        ContentType: req.query.s3_object_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err) return next(err);
        else{
        		//Everythings cool, return the public url to the form so you can put it in your db.
            var return_data = {
                signed_request: data,
                url: 'http://cornerfind.s3-website-us-west-2.amazonaws.com/'+req.query.s3_object_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
};