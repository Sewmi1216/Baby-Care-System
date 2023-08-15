const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Password hashing
const schema = mongoose.Schema;

const parentSchema = new schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, // Data type: Object ID
        ref: 'User' // Reference to the 'User' model
    },

})

const Parent = mongoose.model("Parent", parentSchema);

module.exports = Parent;