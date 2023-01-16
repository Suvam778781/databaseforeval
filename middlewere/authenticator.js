
const jwt=require("jsonwebtoken")

const authenticator=(req,res,next)=>{

    const token=req.headers.Authorization
    if(token){
        const decode=jwt.verify(token,"masai")


        if(decode){

            const userID=decode.userID
            req.body.userID=userID

            next()
        }

        else {

            res.send({"err":"please login first"})
        }
    }

    else {
res.send({"err":"please login first"})
    }
}

module.exports={authenticator}