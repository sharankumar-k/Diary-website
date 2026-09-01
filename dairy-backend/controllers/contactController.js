const mongoose = require('mongoose')
const Contact = require('../models/Contact')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[0-9+() -]{7,}$/

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1
}

async function createContact(req, res, next) {
  console.log('CREATE CONTACT CALLED:', req.body)
  if (!isDatabaseConnected()) {
    return res.status(503).json({ success: false, message: 'Database is unavailable. Please try again shortly.' })
  }

  try {
    const { name, email, phone, product, message } = req.body

    if (!name || !email || !phone || !product || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, phone, product, and message are required.' })
    }

    if (!emailPattern.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' })
    }

    if (!phonePattern.test(phone)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid phone number.' })
    }

    const contact = await Contact.create({ name, email, phone, product, message })
    return res.status(201).json({ success: true, message: 'Enquiry received successfully.', data: contact })
  } catch (error) {
    return next(error)
  }
}

async function getContacts(req, res, next) {
  if (!isDatabaseConnected()) {
    return res.status(503).json({ success: false, message: 'Database is unavailable. Please try again shortly.' })
  }

  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    return res.status(200).json({ success: true, count: contacts.length, data: contacts })
  } catch (error) {
    return next(error)
  }
}

module.exports = { createContact, getContacts }