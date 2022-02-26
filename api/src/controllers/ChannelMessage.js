const { ErrorAPIMessage } = require("../errors/customError")
const Channel = require("../models/Channel")
const ChannelMessage = require("../models/ChannelMessage")
const User = require("../models/User")

const getAllChannelMessages = async (req, res) => {
  await ChannelMessage.find({})
    .populate('user', '-__v -password -active -createdAt -updatedAt')
    .then((data) => {
      res.status(200).json({ messages: data })
    })
}

const getChannelMessage = async (req, res) => {
  const message = await ChannelMessage.findById(req.params.id)

  if (!message) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }
  res.status(200).json({ message: message })
}

const createChannelMessage = async (req, res) => {
  const channel = await Channel.findById(req.body.channel)

  /**
   * Check member exist or not
   */
  const memberExist = channel.members.indexOf(req.body.user)
  if (memberExist === -1) {
    throw new ErrorAPIMessage('The user is not a member in the channel', 500)
  }

  const message = await ChannelMessage.create(req.body)
  res.status(200).json({ message: message })
}

const upadteChannelMessage = async (req, res) => {
  const message = await ChannelMessage.findByIdAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!message) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }

  res.status(200).json({ message: message })
}

const deleteChannelMessage = async (req, res) => {
  const message = await ChannelMessage.findByIdAndRemove({
    _id: req.params.id
  })

  if (!message) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }

  res.status(200).json({ message: message })
}

module.exports = {
  getAllChannelMessages,
  getChannelMessage,
  createChannelMessage,
  upadteChannelMessage,
  deleteChannelMessage
}