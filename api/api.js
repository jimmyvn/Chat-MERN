require('dotenv').config({
  path: '../.env'
})
require('express-async-errors')
const express = require('express')
const connectDatabase = require('./src/database/connect')
const app = express()
const auth = require('./src/middleware/auth')

// Routes
const authenticate = require('./src/routes/authenticate')
const userRoutes = require('./src/routes/users')
const channelRoutes = require('./src/routes/channels')
const channelMemberRoutes = require('./src/routes/channelMembers')
const channelMessagesRoutes = require('./src/routes/channelMessages')

// middleware
const NotFound = require('./src/middleware/NotFound')
const errorHandler = require('./src/middleware/errorHandler')
app.use(express.json())

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  )
  next()
})

app.use('/api/v1/auth', authenticate)
app.use('/api/v1/users', auth, userRoutes)
app.use('/api/v1/channels', auth, channelRoutes)
app.use('/api/v1/channels', auth, channelMemberRoutes)
app.use('/api/v1/channel-messages', auth, channelMessagesRoutes)

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