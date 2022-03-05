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

io.on('connection', async (socket) => {
  console.log("A user has been connected.")
  socket.on('userAccessPage', (userId) => {
    addUser(userId, socket.id)
  })

  socket.on('sendMessage', async (dataMessage) => {
    const userIds = dataMessage.members
    io.emit('getMessage', dataMessage)
    // console.log(dataMessage);
    // for (let i = 0; i < userIds.length; ++i) {
    //   const user = await getUser(userIds[i])
    //   console.log(userIds[i], user);
    //   if (user) {
    //     io.to(user.socketId).emit('getMessage', dataMessage)
    //   }
    // }
  })

  socket.on('userLoggingOut', (userId) => {
    console.log(`${userId}, ${socket.id} is logging out.`)
    removeUserByUserId(userId)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
    removeUserBySocketId(socket.id)
  })
})