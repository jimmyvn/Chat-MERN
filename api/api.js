require('dotenv').config({
  path: '../.env'
})
require('express-async-errors')
const express = require('express')
const connectDatabase = require('./src/database/connect')
const app = express()

// Routes
const userRoutes = require('./src/routes/users')
const channelRoutes = require('./src/routes/channels')
const channelMemberRoutes = require('./src/routes/channelMembers')
const channelMessagesRoutes = require('./src/routes/channelMessages')

// middleware
const NotFound = require('./src/middleware/NotFound')
const errorHandler = require('./src/middleware/errorHandler')
app.use(express.json())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/channels', channelRoutes)
app.use('/api/v1/channels', channelMemberRoutes)
app.use('/api/v1/channel-messages', channelMessagesRoutes)

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