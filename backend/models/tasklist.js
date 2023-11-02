// 1.import mongoose package and assign to a constant variable
const mongoose = require("mongoose");
// 2.Schema ,
const schema = mongoose.Schema; // mongoose wala schema kiyana eka variable ekkta assign karagannwa

//3.java wala object ekk wage
const taskListSchema = new schema({

    parent: {
        type: schema.Types.ObjectId,
        ref: 'Parent',
    },

    Babysitter: {
        type: schema.Types.ObjectId,
        default: null,
    },

    taskListName: {
        type:String,
        required: false
    },

    date:{
        type: Date,
        required: false,
    },


    tasks:[{
        taskName:{
            type:String,
            required: false,//?????????
        },
        time:{
            type:String,
            required:false,
        },
        isRemainder:{
            type:Boolean,
            default:false,
        },
        isCompleted:{
            type:Boolean,
            default: false,
        },
        specialNote:{
            type:String,
            required: false,
        },

    }]
})

const TaskListForm = mongoose.model("TaskListForm", taskListSchema);
module.exports = TaskListForm;
