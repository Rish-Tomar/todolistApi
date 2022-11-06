const express = require('express')
const Router  = express.Router();

const controller = require('../controllers/userController')

Router.get('/',controller.createUser)

Router.use('/api',require('./api/users'))
module.exports = Router