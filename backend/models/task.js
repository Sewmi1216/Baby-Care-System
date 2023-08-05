const mongoose = require('mongoose');

const schema = mongoose.Schema;

const taskSchema = new schema({
    status: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    taskCompletedStatus: {
        type: String,
        required: true
    },
    remainderStatus: {
        type: String,
        required: true
    },
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;