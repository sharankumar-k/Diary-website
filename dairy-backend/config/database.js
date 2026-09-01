const mongoose = require('mongoose')

async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured')
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected')
    console.log(`Mongoose readyState: ${mongoose.connection.readyState}`)
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`)
    throw error
  }
}

module.exports = connectDatabase