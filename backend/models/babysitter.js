const mongoose = require('mongoose');

const schema = mongoose.Schema;

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
})

const Babysitter = mongoose.model("Babysitter", babysitterSchema);

module.exports = Babysitter;