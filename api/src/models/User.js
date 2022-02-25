const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    maxlength: [200, 'Name field can not more than 200 characters']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email field is required'],
  },
  avatar: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    maxlength: [10, 'Gender field can not more than 10 characters'],
    default: null,
  },
  dob: {
    type: String,
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
})
uniqueValidator.defaults.message = 'User with same `{PATH}` already exists. Please try with another email address.'
UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', UserSchema)