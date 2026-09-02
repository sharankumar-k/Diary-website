const jwt = require('jsonwebtoken')
const User = require('../models/User')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

function sendToken(res, token) {
  const isProduction = process.env.NODE_ENV === 'production'

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }

  res.cookie('jwt', token, cookieOptions)
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      })
    }

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      })
    }

    const user = await User.create({ name, email, password })

    const token = createToken(user._id)
    sendToken(res, token)

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    return next(error)
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      })
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const passwordMatch = await user.matchPassword(password)

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const token = createToken(user._id)
    sendToken(res, token)

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    return next(error)
  }
}

async function logout(req, res, next) {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    })
  } catch (error) {
    return next(error)
  }
}

async function me(req, res, next) {
  try {
    const token = req.cookies && req.cookies.jwt

    if (!token) {
      return res.status(200).json({
        success: true,
        user: null,
      })
    }

    let decoded

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      return res.status(200).json({
        success: true,
        user: null,
      })
    }

    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return res.status(200).json({
        success: true,
        user: null,
      })
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = { register, login, logout, me }
