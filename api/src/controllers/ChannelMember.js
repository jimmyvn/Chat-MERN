const { ErrorAPIMessage } = require("../errors/customError")
const Channel = require("../models/Channel")
const User = require("../models/User")

const getChannelMembers = async (req, res) => {
  const channelMembers = await Channel.findById({
    _id: req.params.id
  }).populate('members', '-__v -password -active')

  if (!channelMembers) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }

  res.status(200).json({ members: channelMembers })
}

const addMemberToChannel = async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (!user) {
    throw new ErrorAPIMessage(`There's no result for user with ID: ${req.params.userId}`, 404)
  }

  const channel = await Channel.findByIdAndUpdate(
    req.params.channelId,
    { $push: { members: user._id } },
    { new: true, useFindAndModify: false }
  )
  res.status(200).json({ members: channel })
}

const removeChannelMember = async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (!user) {
    throw new ErrorAPIMessage(`There's no result for user with ID: ${req.params.userId}`, 404)
  }

  const channel = await Channel.findByIdAndUpdate(
    req.params.channelId,
    { $pull: { members: user._id } },
    { new: true }
  ).populate('members')

  res.status(200).json({ members: channel })
}

module.exports = {
  getChannelMembers,
  addMemberToChannel,
  removeChannelMember,
}