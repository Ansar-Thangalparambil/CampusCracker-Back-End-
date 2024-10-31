//this is a middleware (router middleware) 
//a middleware have the pottential to control the request response cycle.
// two types - application middleware - affecting an entire app ie, all the requests pass throught this type of middlewares
//           - router middleware - Only present at a particular path (Middleware using in this project)

//import jwt
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware');
    const token = req.headers['authorization']
    console.log(token);
    
    next()
    
}

module.exports = jwtMiddleware