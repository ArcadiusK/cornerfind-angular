/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Condition = require('./condition.model');

exports.register = function(socket) {
  Condition.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Condition.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('condition:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('condition:remove', doc);
}