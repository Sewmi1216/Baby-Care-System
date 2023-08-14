const mongoose = require('mongoose');

const schema = mongoose.Schema;

const adminSchema = new schema({
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
    phone_no:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    }

})

const Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;