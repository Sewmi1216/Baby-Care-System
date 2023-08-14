const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;

const parentSchema = new schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

})

const Parent = mongoose.model("Parent", parentSchema);

module.exports = Parent;