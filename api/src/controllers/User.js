const { ErrorAPIMessage } = require("../errors/customError")
const User = require("../models/User")

const getAllUsers = async (req, res) => {
  const users = await User.find()
  res.status(200).json({ users: users })
}

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }
  res.status(200).json({ user: user })
}

const createUser = async (req, res) => {
  const user = await User.create(req.body)
  res.status(200).json({ user: user })
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

  res.status(200).json({ user: user })
}

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove({
    _id: req.params.id
  })

  if (!user) {
    throw new ErrorAPIMessage(`There's no result for ID: ${req.params.id}`, 404)
  }

  res.status(200).json({ user: user })
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}