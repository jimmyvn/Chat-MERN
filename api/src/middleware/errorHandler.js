const { ErrorAPIMessage } = require("../errors/customError")

const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error instanceof ErrorAPIMessage) {
    return res.status(error.statusCode || 500).json({ message: error.message })
  }

  if (error instanceof Error) {
    return res.status(422).json({ message: error })
  }

  return res.status(500).json({ message: error })
}

module.exports = errorHandler