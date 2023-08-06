const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    }

})

const Admin = mongoose.model("Admin",adminSchema);
module.export= Admin;