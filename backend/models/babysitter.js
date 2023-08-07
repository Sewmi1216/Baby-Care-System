const mongoose = require('mongoose');

const schema = mongoose.Schema;

const qualificationsSchema = new schema ({
    filename: {
        type: String,
        required: true,
    },
    filetype: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
    },
    data: { 
        type: String, //binary_data_or_file_url_here
        required: true,
    }
})

const verificationDetailsSchema = new schema ({
    filename: {
        type: String,
        required: true,
    },
    filetype: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
    },
    data: {
        type: String,
        required: true,
    }
})

const babysitterSchema = new schema ({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    age: {
        type: Number, 
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    qualifications:{
        type: [qualificationsSchema],
        required: true,
    },
    verificationDetails: {
        type: [verificationDetailsSchema],
        required: true,
    },
})

const Babysitter = mongoose.model("Babysitter", babysitterSchema);

module.exports = Babysitter;