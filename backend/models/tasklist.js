const mongoose = require('mongoose');

const schema = mongoose.Schema;

const taskListSchema = new schema({
    tasklistName: {
        type: String,
        required: true,
    },
    parent: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
    },
    date: { 
        type: Date,
        required:false
    },
    task: [{
        taskName: {
            type: String,
            required: false,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        time: {
            type: Date,
            required: false,
        },
        isRemainder: {
            type: Boolean,
            default: false,
        },
        specialNote: {
            type: String,
            required: false,
        },
    }],
})

const TaskList = mongoose.model("TaskList", taskListSchema);

module.exports = TaskList;