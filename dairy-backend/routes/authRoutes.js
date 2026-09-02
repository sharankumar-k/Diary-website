const express = require('express')
const { register, login, logout, me } = require('../controllers/authController')

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/me').get(me)

module.exports = router
