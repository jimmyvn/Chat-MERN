const { ErrorAPIMessage } = require("../errors/customError")
const ChannelMessage = require("../models/ChannelMessage")

const getAllChannelMessages = async (req, res) => {
  await ChannelMessage.find()
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