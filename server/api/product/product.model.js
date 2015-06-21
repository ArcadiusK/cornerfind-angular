'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
userId: {type: Schema.Types.ObjectId, ref: 'User'},
category: [{type: String, index: true}], //from categories collection
gender: {type: String, enum : ["Boy", "Girl", "Neutral"], default: "Neutral"},
qty: {type: Number},
name: {type: String},
desc: {type: String},
photoUrls: [{type: String}],
condition: {type: String}, //from conditions collection
available: {type: Boolean},
price: {type: Number},
brand: {type: String},
retailPrice: {type: Number},
offers: [{type: Schema.Types.ObjectId, ref: 'Order',default:[]}]
});

ProductSchema.index({name: 'text', brand: 'text', category:'text', desc: 'text' });

module.exports = mongoose.model('Product', ProductSchema);
