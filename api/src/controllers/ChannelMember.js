const { ErrorAPIMessage } = require("../errors/customError")
const Channel = require("../models/Channel")
const User = require("../models/User")
const mongoose = require('mongoose')

const getChannelMembers = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(200).json({ data: [] })
    return
  }

  const channelMembers = await Channel.findOne({
    _id: req.params.id
  }).populate('members', '-__v -password -active')

  if (!channelMembers) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }

  res.status(200).json({ success: true, data: channelMembers.members })
}

const getMembersToInviteToChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.channelId)) {
    res.status(404).json({
      success: false,
      message: `There's no result for channel with ID: ${req.params.channelId}`
    })
    return
  }

  // get current channel
  const channel = await Channel.findOne({
    _id: req.params.channelId
  })

  const userName = req.query.keyword
  const users = await User.find({
    name: { $regex: userName },
    _id: { $nin: Object.values(channel.members) }
  }).limit(20)

  res.status(200).json({ success: true, data: users })
}

const addMembersToChannel = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.channelId)) {
    res.status(404).json({
      success: false,
      message: `There's no result for channel with ID: ${req.params.channelId}`
    })
    return
  }

  let memberIds = req.body.members
  for (let i = 0; i < memberIds.length; ++i) {
    let userId = memberIds[i]
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(404).json({
        success: false,
        message: `There's no result for user with ID: ${userId}`
      })
      return
    }
    const user = await User.findById(userId)

    if (!user) {
      throw new ErrorAPIMessage(`There's no result for user with ID: ${req.params.userId}`, 404)
    }
  }

  const channel = await Channel.findByIdAndUpdate(
    req.params.channelId,
    { $push: { members: { $each: req.body.members } } },
    { new: true, useFindAndModify: false }
  )
  res.status(200).json({ success: true, data: channel })
}

const removeChannelMember = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    res.status(404).json({
      success: false,
      message: `There's no result for user with ID: ${req.params.userId}`
    })
    return
  }

  const user = await User.findById(req.params.userId)

  if (!user) {
    throw new ErrorAPIMessage(`There's no result for user with ID: ${req.params.userId}`, 404)
  }

  const channel = await Channel.findByIdAndUpdate(
    req.params.channelId,
    { $pull: { members: user._id } },
    { new: true }
  ).populate('members')

  res.status(200).json({ data: channel })
}

module.exports = {
  getChannelMembers,
  addMembersToChannel,
  removeChannelMember,
  getMembersToInviteToChannel,
}