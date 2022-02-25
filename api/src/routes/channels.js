const express = require('express')
const {
  getAllChannels,
  createChannel,
  upadteChannel,
  deleteChannel,
  getChannel
} = require('../controllers/Channel')
const router = express.Router()

/**
 * Get all and create channel
 */
router.route('/')
  .get(getAllChannels)
  .post(createChannel)

/**
 * All routes with specific channelId
 */
router.route('/:id')
  .get(getChannel)
  .patch(upadteChannel)
  .delete(deleteChannel)


module.exports = router