const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
  }
})

let users = []

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({
      userId, socketId
    })

  console.log(users)
}

const removeUserBySocketId = (socketId) => {
  users = users.filter(user => user.socketId !== socketId)
  console.log(users)
}

const removeUserByUserId = (userId) => {
  users = users.filter(user => user.userId !== userId)
  console.log(users)
}

const getUser = (userId) => {
  return users.find(user => user.userId === userId)
}

const getActiveRooms = (io) => {
  const arr = Array.from(io.sockets.adapter.rooms)
  const filtered = arr.filter(room => !room[1].has(room[0]))
  return filtered.map(i => i[0])
}

io.on('connection', (socket) => {
  console.log("A user has been connected.")
  socket.on('userAccessPage', (payload) => {
    const channels = payload.channels
    // channels.forEach((channel) => {
    //   socket.leave(channel._id.toString())
    // })
    channels.forEach(channel => {
      socket.join(channel._id.toString())
    })
    addUser(payload._id, socket.id)
    console.log(socket.rooms)
  })

  socket.on('sendMessageChannel', (dataMessage) => {
    console.log(dataMessage.channel, dataMessage)
    io.to(dataMessage.channel.toString()).emit('getMessageChannel', dataMessage)
    // io.emit('getMessageChannel', dataMessage)
  })


  socket.on('userLoggingOut', (userId) => {
    console.log(`${userId}, ${socket.id} is logging out.`)
    removeUserByUserId(userId)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected.')
    removeUserBySocketId(socket.id)
  })


})