const express = require('express')
const { getUserByEmail } = require('../controller/userController')
const route = express.Router()

route.get('/', getUserByEmail)

module.exports = route