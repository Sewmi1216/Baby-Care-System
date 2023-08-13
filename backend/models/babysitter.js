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
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    age: {
        type: Number, 
        required: true
    },
    gender: {
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