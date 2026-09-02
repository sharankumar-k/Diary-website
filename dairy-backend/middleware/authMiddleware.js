const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function protect(req, res, next) {
  let token

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in.',
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists. Please log in again.',
      })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.',
      })
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please log in again.',
    })
  }
}

module.exports = { protect }
