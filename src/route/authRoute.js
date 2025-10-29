const express = require('express')
const { authValidation, authLogin } = require('../validation/authValidation')
const { registerController, loginController } = require('../controller/authController')
const route = express.Router()

route.post('/register', authValidation, registerController)
route.post('/login', authLogin, loginController)

module.exports = route