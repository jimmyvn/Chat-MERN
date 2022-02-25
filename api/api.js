require('dotenv').config({
  path: '../.env'
})
require('express-async-errors')
const express = require('express')
const connectDatabase = require('./src/database/connect')
const app = express()

// Routes
const channelRoutes = require('./src/routes/channels')
const channelMessages = require('./src/routes/channelMessages')
const userRoutes = require('./src/routes/users')

// middleware
const NotFound = require('./src/middleware/NotFound')
const errorHandler = require('./src/middleware/errorHandler')
app.use(express.json())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/channels', channelRoutes)
app.use('/api/v1/channel-messages', channelMessages)

app.use(NotFound)
app.use(errorHandler)

const port = process.env.NODE_PORT || 3001

const start = async () => {
  try {
    await connectDatabase()
    app.listen(port, () => {
      console.log(`The api is listenning on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()