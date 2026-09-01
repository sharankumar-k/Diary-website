const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const contactRoutes = require('./routes/contactRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  console.log('Health check readyState:', mongoose.connection.readyState)
  console.log('Health check host:', mongoose.connection.host)
  console.log('Health check name:', mongoose.connection.name)

  res.status(200).json({
    success: true,
    message: 'PureDairy API is healthy',
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    databaseName: mongoose.connection.name,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

app.use('/api/contact', contactRoutes)
app.use(notFound)
app.use(errorHandler)

module.exports = app