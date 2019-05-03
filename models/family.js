'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var familySchema = Schema({
    name: String,
    father: {type: Schema.ObjectId, ref: 'Person'},
    mother: {type: Schema.ObjectId, ref: 'Person'},
    inCharge: [{type: Schema.ObjectId, ref: 'Person'}],
    son: [{type: Schema.ObjectId, ref: 'Person'}]
});

module.exports = mongoose.model('Family', familySchema);