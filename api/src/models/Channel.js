const mongoose = require('mongoose')

const ChannelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [
      true,
      'Title field is required.',
    ],
    trim: true,
    maxlength: [
      200,
      'The title must be less than 200 characters',
    ],
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  avatar: {
    type: String,
    required: false,
    default: null,
    maxlength: [
      400,
      'The title must be less than 400 characters',
    ],
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Channel', ChannelSchema)