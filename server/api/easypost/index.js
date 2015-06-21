'use strict';

var express = require('express');
var controller = require('./easypost.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/createLabel', controller.createLabel);
router.post('/verify', controller.verify);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;