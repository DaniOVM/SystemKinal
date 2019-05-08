'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema({
    firstName: String, //firstName , firstLastName, birthname, religion, gender
    middleName: String,
    firstLastName: String, 
    secondLastName: String,
    marriedName: String,
    birthname: Date,
    religion: String,
    email: Array,
    gender: String,
    civilStatus: String,
    address: Object,
    department: String,
    municipality: String,
    zone: Number,
    residential: String,
    avenue: String,
    street: String,
    sector: String,
    number: String,
    other: String,
    /**------------------------------------------------------------------------------------------------------------------------------------------------ */
    phones: Object,
    cellphone: Number,
    house: Number,
    otherNumber: Array
});

module.exports = mongoose.model('Person', personSchema);