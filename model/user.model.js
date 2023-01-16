const mongoose=require("mongoose")


const userSchema={
    name : String,
    email : String,
    gender : String,
    password : String,
    
    

}
const Usermodel=mongoose.model("user",userSchema)
module.exports={Usermodel}

