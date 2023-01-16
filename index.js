const express=require("express")
const mongoose=require("mongoose")

const app=express()
const bcrypt=require("bcrypt")
const cors=require("cors")
require("dotenv").config()

const{Connection} =require("./config/db")
const jwt=require("jsonwebtoken")

const { userRouter } = require("./routes/user.routes")
const { postRouter } = require("./routes/post.router")
const { authenticator } = require("./middlewere/authenticator")
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.use("/users",userRouter)

app.use("/posts",authenticator)
app.use("/posts",postRouter)



app.listen(process.env.port,async()=>{
try{
await Connection
console.log("connected succesfully to db")
}
catch(err){
    console.log("connection faild")
    console.log(err)
}
})

