const jwt = require("jsonwebtoken")

module.exports = async (request, response, next) => {
  try {
    // Get the token from the authorization header
    const token = await request.headers.authorization.split(" ")[1];

    // Check if the token matches the supposed origin
    const decodedToken = jwt.verify(token, "RANDOM-TOKEN")

    // Retrieve the user details of the logged in user
    const user = decodedToken

    // Pass the the user down to the endpoints here
    request.user = user

    // Pass down functionality to the endpoint
    next()

  } catch (error) {
    response.status(401).json({
      error: "Invalid token!",
    })
  }
}