const express = require('express')
const Router  = express.Router();
const passport = require('passport')

const userApiController =require('../../controllers/api/apiUserController')

Router.post('/create-session',userApiController.createSession) // will be called when the signin button will be clicked 

Router.post('/create-todo/:id',passport.authenticate('jwt',{session:false}),userApiController.createTodo)
//session is falsed to prevent from generating session cookies

Router.patch('/update-post/:userid/:todoid',passport.authenticate('jwt',{session:false}),userApiController.updateTodo)
Router.delete('/delete/:userid/:todoid',passport.authenticate('jwt',{session:false}),userApiController.deleteTodo)
module.exports = Router