// To setup path to resolve request

// 1)import Express
const express = require('express');

// import controller
const userController = require('../Controllers/usercontrollers')

// 2)create an object for Router() class in the express module
const router = new express.Router();

// 3)Logic
    // Syntax = router.httpreq(path,()=>{how to solve})
    // a)Register
    router.post('/user/register',userController.register)

// 4)Export router
module.exports = router