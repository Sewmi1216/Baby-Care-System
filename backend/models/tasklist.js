// 1.import mongoose package and assign to a constant variable
const mongoose = require("mongoose");
// 2.Schema ,
const Schema = mongoose.Schema; // mongoose wala schema kiyana eka variable ekkta assign karagannwa

// this is nested schema declaration, we should first declare taskSchema before trying to use it
//
// const taskSchema = new mongoose.Schema({
//
//     taskName:{
//         type:String,
//         required: false,//?????????
//     },
//     time:{
//         type:Date,
//         required:false,
//     },
//     isRemainder:{
//         type:Boolean,
//         default:false,
//     },
//     isCompleted:{
//         type:Boolean,
//         default: false,
//     },
//     specialNote:{
//         type:String,
//         required: false,
//     },
// });



//3.java wala object ekk wage
const taskListSchema = new Schema({
    // 4. give attributes of task list
    // parent: {
    //     //type: String,
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: '64d7934aeb8b8905034db8e0'
    //
    //     // ref: 'Parent' // Reference to the 'Parent' model
    // },

    /*parent hara anithwa okkoma .ts ge taskListForm ta ganna one*/
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Parent',
    },

    Babysitter: {
        type: Schema.Types.ObjectId,
        required: true,
    },

    taskListName: {
        type:String,
        required: true
    },

    date:{
        type:Date,
        required: false // ?????????????????
    },

    // tasks:[taskSchema] ,

    tasks:[{
        taskName:{
            type:String,
            required: false,//?????????
        },
        time:{
            type:Date,
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

});


const TaskListForm = mongoose.model('taskList', taskListSchema);
module.exports = TaskListForm;
