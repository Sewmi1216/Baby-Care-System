const mongoose = require('mongoose');

const schema = mongoose.Schema;

const taskSchema = new schema({
    taskName: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    time: {
        type: Date,
        required: false
    },
    isRemainder: {
        type: Boolean,
        default: false,
    },
    specialNote: {
        type: String,
        required: false,
    },
    parent: {
        type: schema.Types.ObjectId,
        ref: 'Parent',
    },
    babysitter: {
        type: schema.Types.ObjectId,
        ref: 'Babysitter',
    }
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;