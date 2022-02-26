const { ErrorAPIMessage } = require("../errors/customError")

const errorHandler = (error, req, res, next) => {
  if (error instanceof ErrorAPIMessage) {
    return res.status(error.statusCode || 500).json({ message: error.message })
  }

  return res.status(500).json({ message: error })
}

module.exports = errorHandler