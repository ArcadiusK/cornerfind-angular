'use strict';

var express = require('express');
var controller = require('./product.controller');
var s3_upload = require('./s3_upload');
var router = express.Router();

router.get('/sign_s3',s3_upload);

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/listings',controller.getUsersListings)
router.post('/filtered',controller.filtered)
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/:query/search', controller.search);

module.exports = router;
