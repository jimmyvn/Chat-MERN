const express = require('express')
const {
  getAllChannelMessages,
  createChannelMessage,
  upadteChannelMessage,
  deleteChannelMessage,
  getChannelMessage
} = require('../controllers/ChannelMessage')
const router = express.Router()

/**
 * Get all and create channel
 */
router.route('/')
  .get(getAllChannelMessages)
  .post(createChannelMessage)

/**
 * All routes with specific channelId
 */
router.route('/:id')
  .get(getChannelMessage)
  .patch(upadteChannelMessage)
  .delete(deleteChannelMessage)


module.exports = router