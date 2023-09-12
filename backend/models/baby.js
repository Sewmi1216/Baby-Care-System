const mongoose = require('mongoose');

const schema = mongoose.Schema;

const babySchema = new schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },

    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent' // Reference to the 'Parent' model
    },

    growthParameters: [{
        parameter:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'growthParameters'
        },

        isCheck:{
            type: Boolean,
            default:false
        }
    }]

})

const Baby = mongoose.model("Baby", babySchema);

module.exports = Baby;