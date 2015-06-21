/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Like = require('./like.model');

exports.register = function(socket) {
  Like.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Like.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('like:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('like:remove', doc);
}