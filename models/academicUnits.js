'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AcademicUnitsSchema = Schema({
    code: String,
    academicUnit: String,
    description: String
})

module.exports = mongoose.model('AcadecUnit', AcademicUnitsSchema);