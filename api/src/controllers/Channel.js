const { ErrorAPIMessage } = require("../errors/customError")
const Channel = require("../models/Channel")
const ChannelMessage = require("../models/ChannelMessage")

const getAllChannels = async (req, res) => {
  await Channel.find()
    .then((data) => {
      res.status(200).json({ channels: data })
    })
}

const getChannel = async (req, res) => {
  const channel = await Channel.findById(req.params.id)

  if (!channel) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }
  res.status(200).json({ channel: channel })
}

const getChannelMessages = async (req, res) => {
  const messages = await ChannelMessage.find(
    { channel: req.params.channelId }
  ).populate('user', '-__v -password -active -createdAt -updatedAt')

  res.status(200).json({ messages: messages })
}

const createChannel = async (req, res) => {
  const channel = await Channel.create(req.body)
  res.status(200).json({ channel: channel })
}

const upadteChannel = async (req, res) => {
  const channel = await Channel.findByIdAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!channel) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }

  res.status(200).json({ channel: channel })
}

const deleteChannel = async (req, res) => {
  const channel = await Channel.findByIdAndRemove({
    _id: req.params.id
  })

  if (!channel) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }

  res.status(200).json({ channel: channel })
}

module.exports = {
  getAllChannels,
  getChannel,
  getChannelMessages,
  createChannel,
  upadteChannel,
  deleteChannel
}