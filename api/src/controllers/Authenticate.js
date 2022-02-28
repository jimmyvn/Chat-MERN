const User = require("../models/User")
const { generateJWT } = require('../services/jwt.service')

const login = async (req, res) => {

  await User.findOne({
    email: req.body.email
  }).exec((error, user) => {
    if (error) {
      res.status(422).json({ message: 'Invalid email or password, please check again!' })
    } else if (!user) {
      res.status(422).json({ message: 'Invalid email or password, please check again!' })
    } else {
      user.comparePassword(req.body.password, function (matchError, isMatch) {
        if (matchError) {
          res.status(404).json({ message: 'Invalid password, please check again!' })
          return
        } else if (!isMatch) {
          res.status(404).json({ message: 'Invalid password, please check again!' })
          return
        } else {
          const token = generateJWT(user);
          const userRes = {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            gender: user.gender,
            dob: user.dob,
            accessToken: token,
          }

          res.status(200).json({ success: true, data: userRes })
          return
        }
      })
    }
  })

}

module.exports = {
  login
}