// Logic to resolve the request
exports.register=(req,res)=>{
    // logic
    console.log(`inside controller register function`);
    //response
    res.status(200).json("Regn request recieved")
    
}