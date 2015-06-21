/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Easypost = require('./easypost.model');

exports.register = function(socket) {
  Easypost.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Easypost.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('easypost:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('easypost:remove', doc);
}