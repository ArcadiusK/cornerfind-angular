'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BrandSchema = new Schema({
  name: String
});



module.exports = mongoose.model('Brand', BrandSchema);