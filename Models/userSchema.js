//  import mongoose
const mongoose = require('mongoose')

// schema
const userSchema = new mongoose .Schema ({
    fullname : {
        type :String,
        require:true
    },
    email :{
        type :String,
        require:true,
        unique:true
    },
    regnno :{
        type :String,
        require:true,
        unique:true
    },
    department : {
        type : String,
        require:true
    },
    yearofstudy : {
        type : String,
        require:true
    },
    username : {
        type : String,
        require:true,
        unique:true
    } ,
    password : {
        type : String,
        require:true
    }

}) 

// create model
const users = mongoose.model("users",userSchema)

// export model
module.exports = users 