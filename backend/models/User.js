//user model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;

const userSchema = new schema({
    role: String,
    firstName:{
        type :String,
        required:true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    nic :{
        type:String,
        required:true
    },
    profile:{
        type:String
    },
    status:{
        type:String
    },
    status:{
        type:Boolean,
        default: 0
    },
})

const User = mongoose.model("User", userSchema);

module.exports = User;