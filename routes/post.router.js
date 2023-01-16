const express = require("express");
const mongoose = require("mongoose");

const postRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Postmodel } = require("../model/post.model");


postRouter.get("/",async(req,res)=>{
    try{
      const data=await Postmodel.find() 

      res.send(data)
    }
catch{
res.send("something went wrong")
}
})
postRouter.delete("/delete:id",async(req,res)=>{
    const id=req.params.id
    try{
    await Postmodel.findOneAndDelete({_id:id}) 

      res.send("post delete succesfully")
    }
catch{
res.send("post delete faild")
}
})


postRouter.patch("/update:id",async(req,res)=>{

    const id=req.params.id
    try{
    await Postmodel.findOneAndUpdate({_id:id},data) 

      res.send("post update succesfully")
    }
catch{
res.send("post update faild")
}
})
postRouter.post("/create",async(req,res)=>{

    const payload=req.body

    const id=req.params.id
    try{
   const post=new Postmodel(payload) 
      res.send("post create succesfully")
    }
catch{
res.send("post creation faild")
}
})







module.exports = { postRouter };
