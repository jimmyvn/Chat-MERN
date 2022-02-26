const mongoose = require('mongoose')
require('dotenv').config({
  path: '../.env'
})

const connectionString = process.env.MONGODB_URL

const connectDatabase = () => {
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

module.exports = connectDatabase
