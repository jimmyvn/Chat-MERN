const mongoose = require('mongoose')

const ChannelMessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User Id field is required']
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel'
  },
  content: {
    type: String,
    required: [true, 'The message content can not be empty'],
    trim: true,
    maxlength: [800, 'Content of message can not more than 800 characters']
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('ChannelMessage', ChannelMessageSchema)