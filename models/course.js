'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var couserSchema = Schema({
    code: String,
    name: String,
    description: String
});

module.exports = mongoose.model('Course', couserSchema);