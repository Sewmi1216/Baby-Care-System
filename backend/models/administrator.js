const mongoose = require('mongoose');

const schema = mongoose.Schema;

const administratorSchema = new schema ({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:false
    },
    password:{
        type: String,
        required:true
    },
    nic :{
        type: String,
        required:true
    }
})

const Administrator = mongoose.model("Administrator", administratorSchema);

module.exports = Administrator;