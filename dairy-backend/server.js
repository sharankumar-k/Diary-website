require('dotenv').config()

const app = require('./app')
const connectDatabase = require('./config/database')
const mongoose = require('mongoose')

const port = process.env.PORT || 5000

async function startServer() {
  await connectDatabase()

  console.log('Mongoose readyState:', mongoose.connection.readyState)

  app.listen(port, () => {
    console.log(`PureDairy API is running on port ${port}`)
  })
}

startServer()