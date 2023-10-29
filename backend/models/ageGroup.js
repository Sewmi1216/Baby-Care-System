const mongoose = require('mongoose');

const schema = mongoose.Schema;

const ageSchema = new schema({

    type:{
        type:String,
        required:true

    }
})

const AgeGroup = mongoose.model("ageGroup",ageSchema);
module.exports = AgeGroup;