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

// 4)Export router
module.exports = router