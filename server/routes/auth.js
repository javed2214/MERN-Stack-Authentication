const express = require('express')
const router = express.Router()
const { register, login, logout, loggedIn, user } = require('../controllers/auth')
const { auth } = require('../middlewares/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/loggedin').get(loggedIn)
router.route('/user').post(auth, user)

module.exports = router
