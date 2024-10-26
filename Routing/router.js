// To setup path to resolve request

// 1)import Express
const express = require('express');

// import user controller
const userController = require('../Controllers/usercontrollers')

// import general controller'
const generalController = require('../Controllers/generalController')

// 2)create an object for Router() class in the express module
const router = new express.Router();

// 3)Logic
    // Syntax = router.httpreq(path,()=>{how to solve})
    
    // a)Register
    router.post('/user/register',userController.register)

    // b)Login
    router.post('/user/login',userController.login)

    //c)Admin Login
    router.post('/admin/login',userController.adminlogin)

    //d)Admin Add questions
    router.post('/general/pot/add',generalController.addQuestion)

    //e)Get Arithmetic aptitude questions
    router.get('/general/arith/pot',generalController.getArithQuestions)

    //f)Edit question
    router.put('/question/edit/:id',generalController.editQuestions)

    //i)delete project
    router.delete('/question/remove/:id',generalController.deleteArithQuestions)

    //f)get all users
    router.get('/admin/allusers',userController.getAllUsers)

// 4)Export router
module.exports = router