const express = require('express')
const router = express.Router()
const { private } = require('../controllers/private')
const { auth } = require('../middlewares/auth')

router.route('/private').post(auth, private)

module.exports = router