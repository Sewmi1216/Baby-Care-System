const mongoose = require('mongoose');

const schema = mongoose.Schema;

const feedbackSchema = new schema ({
    // parentName: {
    //     type: String,
    //     ref: 'Parent', 
    //     // This should match the name of your Parent model
    //     required: true
    // },
    details: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
})

const FeedbackSchema = mongoose.model("Feedback", feedbackSchema);

module.exports = FeedbackSchema;