class ErrorAPIMessage extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

const createErrorAPIMessage = (message, statusCode) => {
  return new ErrorAPIMessage(message, statusCode)
}

module.exports = {
  createErrorAPIMessage,
  ErrorAPIMessage
}