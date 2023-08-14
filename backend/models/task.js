const mongoose = require('mongoose');

const schema = mongoose.Schema;

const taskSchema = new schema({
    // status: {
    //     type: String,
    //     required: true
    // },
    // time: {
    //     type: Date,
    //     required: true
    // },
    taskName: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    // remainderStatus: {
    //     type: Boolean,
    //     required: true
    // },
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;