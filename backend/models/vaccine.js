const mongoose = require('mongoose');

const schema = mongoose.Schema;

const vaccineSchema = new schema({

    name:{
        type:String,
        required:true

    },

    age:{
        type:Number,
        required:true

    },

})

const vaccine = mongoose.model("vaccine",vaccineSchema);
module.exports = vaccine;