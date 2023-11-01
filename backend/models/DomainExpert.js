const mongoose = require('mongoose');

const schema = mongoose.Schema;

const addDomainExpertSchema = new schema({
    firstName:{
        type :String,
        required:true
    },
    lastName:{
        type: String,
        required: true
    },
    nic:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:false
    },
    phone_no:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
    

})

const Expert = mongoose.model("Expert",addDomainExpertSchema);
module.exports = Expert;