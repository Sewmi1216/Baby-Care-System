const mongoose = require('mongoose');

const schema = mongoose.Schema;

const messageSchema = new schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: schema.Types.ObjectId,
    ref: 'User',
  },
  // Add other message attributes as needed
});

// Define the Chat schema
const chatSchema = new schema({
  chatId: {
    type: String,
    required: true,
    unique: true,
  },
  participants: [{
    type: schema.Types.ObjectId,
    ref: 'User',
  }],
  messages: [{
    type: schema.Types.ObjectId,
    ref: 'Message',
  }],
  createdDateTime: {
    type: Date,
    required: true,
  },
  chatType: {
    type: String,
    required: true,
  },
});

const Chat = mongoose.model("CHat", chatSchema);

module.exports = Chat;