const mongoose = require('mongoose');

const schema = mongoose.Schema;

const babySchema = new schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        trpe: String,
        required: true
    }
})

const Baby = mongoose.model("Baby", babySchema);

module.exports = Baby;