// Load required packages
var mongoose = require('mongoose');

// Define Review Schema
var ReviewSchema = mongoose.Schema({
    email		: {type: String, required: true, unique: true},
    rating1 : {type: Number},
    rating2 : {type: Number},
    rating3 : {type: Number},
    rating4 : {type: Number},
    text : {type: String},
    location : {type: String},
    dateCreated : {type: Date, default: Date.now}
});

module.exports = mongoose.model('Review', ReviewSchema);
