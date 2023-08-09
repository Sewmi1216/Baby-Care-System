const mongoose = require('mongoose');

const schema = mongoose.Schema;

const complaintSchema = new schema({
    status: {
        type: String,
        required: true
    },
    type: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    taskCompletedStatus: {
        type: Boolean,
        required: true
    },
    remainderStatus: {
        type: Boolean,
        required: true
    },
})

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;