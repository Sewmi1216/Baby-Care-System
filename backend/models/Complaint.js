const mongoose = require('mongoose');

const schema = mongoose.Schema;

const complaintSchema = new schema({
   type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
})

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;