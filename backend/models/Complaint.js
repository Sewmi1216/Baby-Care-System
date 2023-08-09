const mongoose = require('mongoose');

const schema = mongoose.Schema;

const complaintSchema = new schema({
   type: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
})

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;