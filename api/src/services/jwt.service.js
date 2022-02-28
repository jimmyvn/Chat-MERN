const jwt = require('jsonwebtoken')

const generateJWT = (user) => {
  const token = jwt.sign({
    userId: user._id,
    userEmail: user.email,
    userAvatar: user.avatar,
    userGender: user.gender,
    userDob: user.dob
  },
    'RANDOM-TOKEN',
    { expiresIn: '24h' }
  )

  return token
}

module.exports = {
  generateJWT
}