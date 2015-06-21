'use strict';

var express = require('express');
var controller = require('./like.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id/user', controller.getUserLikes);
router.get('/:id/product', controller.getProductLikes);
router.get('/:id', controller.show);
router.post('/delete', controller.deleteLike);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;