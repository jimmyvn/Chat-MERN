const express = require('express')
const {
  getChannelMembers,
  addMembersToChannel,
  removeChannelMember,
  getMembersToInviteToChannel
} = require('../controllers/ChannelMember')
const router = express.Router()

router.route('/:id/members')
  .get(getChannelMembers)

router.route('/:channelId/members')
  .post(addMembersToChannel)

router.route('/:channelId/members/:userId')
  .delete(removeChannelMember)

router.route('/:channelId/members-invite')
  .get(getMembersToInviteToChannel)

module.exports = router