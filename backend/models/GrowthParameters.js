const mongoose = require('mongoose');
const {stringify} = require("nodemon/lib/utils"); //connect the database
const schema = mongoose.Schema; //create schema

//generate GrowthParameterSchema
const GrowthParameterSchema = new schema({
    ageGroup: {
        type: String,
        required: true
    },

    activity: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },


})

const growthParameters = mongoose.model("growthParameters",GrowthParameterSchema);

module.exports = growthParameters;
