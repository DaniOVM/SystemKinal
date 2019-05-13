'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var educationalCareersSchema = Schema({
    code: String,
    name: String,
    description: String
})

module.exports = mongoose.model('Career', educationalCareersSchema);