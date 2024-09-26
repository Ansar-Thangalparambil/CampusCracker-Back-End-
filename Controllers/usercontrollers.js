// Logic to resolve the request
// import model
const users = require('../Models/userSchema');

// logic for register
exports.register = async(req,res)=>{
    console.log(`inside controller register function`);
    // extract data from request body-json() in index.js file converts json data into javascript object
    const {fullname,email,regnno,department,yearofstudy,username,password}=req.body;
       try{const existUser = await users.findOne({email})

        if(existUser){
            res.status(406).json("Email already exists....please Login")
        }
        else{
            // create an object from the model
            const newUser = new users({
                fullname,
                email,
                regnno,
                department,
                yearofstudy,
                username,
                password
            })
            // save the function in mongoose - to permanently store this data in mongodb
           await newUser.save() 
    //response
    res.status(200).json(newUser)
        }}
        catch(err){
            res.status(500).json(`Register request failed due to ${err}`);
        }
}

//logic for login
exports.login = async(req,res)=>{
    console.log('Inside controller login function.');
    const {email,password} = req.body
   try{ const existingUser = await users.findOne({email,password})
    console.log(existingUser);

    if(existingUser){
        res.status(200).json({
            existingUser
        })
    }
    else{
        res.status(406).json('Incorrect email or password!')
    }}catch(err){
        res.status(401).json(`Login failed due to ${err}`)
    }
    
}