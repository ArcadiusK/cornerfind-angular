'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChatSchema = new Schema({
  product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
  textLine: {type: String, required: true},
  sender: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  username: {type: String}
});


module.exports = mongoose.model('Chat', ChatSchema);
