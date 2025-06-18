// src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // Ensure req.body exists
    if (!req.body) {
      req.body = {};  // Initialize req.body if it's undefined
    }

    // Log the request body before processing
    console.log("Request Body Before Middleware:", req.body);

    // Check if token exists in headers
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "Token not provided", success: false });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.jwt_secret);

    // Log the decoded token
    console.log("Decoded Token:", decoded);

    // Check if decoded contains userId
    if (!decoded || !decoded.userId) {
      return res.status(401).send({ message: "Invalid token", success: false });
    }

    // Attach userId to the request body
    req.body.userId = decoded.userId;

    // Log the updated request body after adding userId
    console.log("Request Body After Middleware:", req.body);

    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    // Log the error
    console.error("Error in authMiddleware:", error);

    res.status(401).send({
      message: error.message || "Authentication failed",  // Enhanced error message
      success: false,
    });
  }
};
