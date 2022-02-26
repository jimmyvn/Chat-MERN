const express = require('express')
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
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
  .patch(updateUser)
  .delete(deleteUser)


module.exports = router