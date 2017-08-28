'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var DancersSchema = new Schema({
	firstname: String,
	lastname: String,
	studio: String,
	owed: Number,
	checkedin: Boolean
});

//export our module to use in server.js
module.exports = mongoose.model('Dancers', DancersSchema);