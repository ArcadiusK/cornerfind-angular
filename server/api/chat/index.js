'use strict';

var express = require('express');
var controller = require('./chat.controller');

var router = express.Router();

router.get('/:productid', controller.index); //shows all chats for a producctID
router.get('/', controller.index);
// router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
