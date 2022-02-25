const mongoose = require('mongoose')

const ChannelMessageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Please provide User Id'],
  },
  channelId: {
    type: String,
    required: [true, 'Please provide Channel Id'],
  },
  content: {
    type: String,
    trim: true,
    maxlength: [800, 'Content of message can not more than 800 characters']
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('ChannelMessage', ChannelMessageSchema)