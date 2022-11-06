const express = require('express')
const Router  = express.Router();
const passport = require('passport')

const userApiController =require('../../controllers/api/apiUserController')

Router.post('/signin',userApiController.createSession) // will be called when the signin button will be clicked 

Router.post('/create-todo/:id',passport.authenticate('jwt',{session:false}),userApiController.createTodo)
//session is falsed to prevent from generating session cookies

//update request using patch method
Router.patch('/update-post/:userid/:todoid',passport.authenticate('jwt',{session:false}),userApiController.updateTodo)

//deleting a todo item from list 
Router.delete('/delete/:userid/:todoid',passport.authenticate('jwt',{session:false}),userApiController.deleteTodo)

//returning the todo list items
Router.get('/todo/:id',passport.authenticate('jwt',{session:false}),userApiController.showTodo)


module.exports = Router