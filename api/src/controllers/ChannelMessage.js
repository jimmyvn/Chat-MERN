const { ErrorAPIMessage } = require("../errors/customError")
const Channel = require("../models/Channel")
const ChannelMessage = require("../models/ChannelMessage")
const User = require("../models/User")

const getAllChannelMessages = async (req, res) => {
  await ChannelMessage.find({})
    .populate('user', '-__v -password -active -createdAt -updatedAt')
    .then((data) => {
      res.status(200).json({ data: data })
    })
}

const getChannelMessage = async (req, res) => {
  const message = await ChannelMessage.findById(req.params.id)

  if (!message) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }
  res.status(200).json({ data: message })
}

const createChannelMessage = async (req, res) => {
  const channel = await Channel.findById(req.body.channel)
  if (!channel) {
    throw new ErrorAPIMessage('The channel is not exist', 404)
  }

  const user = await User.findById(req.body.user)
  if (!user) {
    throw new ErrorAPIMessage('The user is not exist', 404)
  }

  if (!user.isMemberOfChannel(channel)) {
    throw new ErrorAPIMessage('The user is not a member in the channel', 500)
  }
  try {
    const message = await ChannelMessage.create(req.body)
    const newMessage = await message.populate('user', '-__v -password -active -createdAt -updatedAt')
    res.status(200).json({ data: newMessage })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const upadteChannelMessage = async (req, res) => {
  const message = await ChannelMessage.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content },
    {
      new: true,
      runValidators: true,
    }
  )

  if (!message) {
    throw new ErrorAPIMessage(`No message has been found`, 404)
  }

  res.status(200).json({ data: message })
}

const deleteChannelMessage = async (req, res) => {
  const message = await ChannelMessage.findByIdAndRemove({
    _id: req.params.id
  })

  if (!message) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }

  res.status(200).json({ data: message })
}

module.exports = {
  getAllChannelMessages,
  getChannelMessage,
  createChannelMessage,
  upadteChannelMessage,
  deleteChannelMessage
}