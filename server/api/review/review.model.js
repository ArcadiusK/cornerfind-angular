'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  reviewingUserId: {type: Schema.Types.ObjectId, ref: 'User', required:true},
  reviewedUserId: {type: Schema.Types.ObjectId, ref: 'User', required:true},
  text: String,
  rating: {type: Number, min:0, max:5, required:true},
  date: {type: Date}
});

module.exports = mongoose.model('Review', ReviewSchema);