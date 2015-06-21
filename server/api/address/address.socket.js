/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Address = require('./address.model');

exports.register = function(socket) {
  Address.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Address.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('address:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('address:remove', doc);
}