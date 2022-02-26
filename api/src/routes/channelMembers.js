const express = require('express')
const {
  getChannelMembers,
  addMemberToChannel,
  removeChannelMember
} = require('../controllers/ChannelMember')
const router = express.Router()

router.route('/:id/members')
  .get(getChannelMembers)

router.route('/:channelId/members/:userId')
  .post(addMemberToChannel)
  .delete(removeChannelMember)

module.exports = router