const { ErrorAPIMessage } = require("../errors/customError")
const Channel = require("../models/Channel")
const ChannelMessage = require("../models/ChannelMessage")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const getAllChannels = async (req, res) => {
  await Channel.find()
    .then((data) => {
      res.status(200).json({ success: true, data: data })
    })
}

const getChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(200).json({ data: [] })
    return
  }

  const channel = await Channel.findById(req.params.id)

  if (!channel) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }
  res.status(200).json({ success: true, data: channel })
}

const getChannelMessages = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.channelId)) {
    res.status(404).json({
      success: false,
      data: `There's no result for ID: ${req.params.channelId}`
    })
    return
  }

  const messages = await ChannelMessage.find(
    { channel: req.params.channelId }
  ).sort({ 'createdAt': -1 }).limit(20).populate('user', '-__v -password -active -createdAt -updatedAt')

  res.status(200).json({ success: true, data: messages.reverse() })
}

const createChannel = async (req, res) => {
  // Add current user creating channel is a member of channel
  const token = await req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM-TOKEN")
  const user = decodedToken
  req.body.members = [user?.userId]

  // Create channel
  const channel = await Channel.create(req.body)
  res.status(200).json({ success: true, data: channel })
}

const upadteChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({
      success: false,
      data: `There's no result for ID: ${req.params.id}`
    })
    return
  }

  const channel = await Channel.findByIdAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!channel) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }

  res.status(200).json({ success: true, data: channel })
}

const deleteChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({
      success: false,
      data: `There's no result for ID: ${req.params.id}`
    })
    return
  }

  const channel = await Channel.findByIdAndRemove({
    _id: req.params.id
  })

  if (!channel) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }

  res.status(200).json({ data: channel })
}

module.exports = {
  getAllChannels,
  getChannel,
  getChannelMessages,
  createChannel,
  upadteChannel,
  deleteChannel
}