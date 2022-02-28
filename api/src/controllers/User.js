const { ErrorAPIMessage } = require("../errors/customError")
const Channel = require("../models/Channel")
const User = require("../models/User")
const mongoose = require('mongoose')

const getAllUsers = async (req, res) => {
  const users = await User.find()
  res.status(200).json({ data: users })
}

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }
  res.status(200).json({ data: user })
}

const createUser = async (req, res) => {
  const user = await User.create(req.body)
  res.status(200).json({ data: user })
}

const updateUser = async (req, res) => {
  delete req.body?.email
  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )

  if (!user) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }

  res.status(200).json({ data: user })
}

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove({
    _id: req.params.id
  })

  if (!user) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }

  res.status(200).json({ data: user })
}

const getChannelsBelongTo = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    res.status(404).json({
      success: false,
      message: `There's no result for user with ID: ${req.params.userId}`
    })
    return
  }

  const channels = await Channel.find({
    members: req.params.userId,
  })

  res.status(200).json({ data: channels })
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getChannelsBelongTo,
}