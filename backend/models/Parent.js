const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;

const parentSchema = new schema({
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

const Parent = mongoose.model("Parent", parentSchema);

module.exports = Parent;