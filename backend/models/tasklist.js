const mongoose = require('mongoose');

const schema = mongoose.Schema;

const taskListSchema = new schema({
    addedState:{
        type: String,
        required: true
    },
    addedDateTime:{
        type: Date,
        required: true
    },
    completedStatus:{
        type: String,
        required: true
    }
})

const TaskList = mongoose.model("TaskList", taskListSchema);

module.exports = TaskList;