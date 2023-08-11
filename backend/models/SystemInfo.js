const mongoose = require('mongoose');

const schema = mongoose.Schema;

const SystemInfoSchema = new schema({
   about: {
        type: String,
        required: true
    },
    goals: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    vision: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
   
    
})
const SystemInfo = mongoose.model("SystemInfo", SystemInfoSchema);

module.exports = SystemInfo;
