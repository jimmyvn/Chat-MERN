const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')
const Channel = require('./Channel')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    maxlength: [200, 'Name field can not more than 200 characters']
  },
  email: {
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
    required: [true, 'Email field is required'],
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
  },
  avatar: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    maxlength: [10, 'Gender field can not more than 10 characters'],
    default: null,
  },
  dob: {
    type: Date,
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
})

UserSchema.pre('save', function (next) {
  const user = this

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

uniqueValidator.defaults.message = 'User with same `{PATH}` already exists. Please try with another email address.'
UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', UserSchema)