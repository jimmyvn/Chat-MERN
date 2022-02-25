const express = require('express')
const {
  getAllUsers,
  getUser,
  createUser,
  upadteUser,
  deleteUser
} = require('../controllers/User')
const router = express.Router()

/**
 * Get all and create User
 */
router.route('/')
  .get(getAllUsers)
  .post(createUser)

/**
 * All routes with specific userId
 */
router.route('/:id')
  .get(getUser)
  .patch(upadteUser)
  .delete(deleteUser)


module.exports = router