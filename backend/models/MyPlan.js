const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myPlanSchema = new Schema({
    isFree: {
        type: Boolean,
        default: true // Set the default value here if needed
    }
});

const MyPlan = mongoose.model("MyPlan", myPlanSchema);

module.exports = MyPlan;
