'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ConditionSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Condition', ConditionSchema);