

const express= require('express');
const jwt=require('jsonwebtoken');
require("dotenv").config();

const User = require("../models/user.model.js");


const newToken=(user)=>{
return jwt.sign({id:user.id},process.env.JWT_SECRET_KEY)
}



const  signup=async(req,res)=>{

    
    try{
        let already_user = await User.findOne({ email: req.body.email }).lean().exec();

        // if it already exists then throw an error
        if (already_user)
          return res.status(400).json({
            status: "failed",
            message: " Please provide a different email address",
          });
    
      
    const adduser= await User.create(req.body);
    const token =newToken(adduser)
    return res.status(201).json({adduser, token });
    } catch(e){
   return res.status(500).json({status:"failed",message:"something wrong happen"})
    }
}





const signin=async(req,res)=>{
  try{
      let user=await User.findOne({email:req.body.email})

      if(!user){
          return res.status(400).json({status:'failed',message:"please provide correct email address and password"})
      }
   console.log(user)
      const match=await user.checkPassword(req.body.password)
 
console.log("match",match)
     
      if(!match)
      return res.status(400).json({status:'failed',message:"please provide correct email address and password"})

      const token = newToken(user)

      res.status(201).json({user,token})

  }catch(e){
      return res.status(500).json({status:"failed",message:e.message})
  }
 
}


//module.exports ={signup, signin}