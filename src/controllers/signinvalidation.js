


const express=require('express');

const User=require('../models/user.model.js');
 const { body, validationResult } = require('express-validator');
const router= express.Router();
const jwt=require('jsonwebtoken');
require("dotenv").config();


const newToken=(user)=>{
  return jwt.sign({id:user.id},process.env.JWT_SECRET_KEY)
  }
  
  




 router.post("/",
 
 
 body("email").custom( async (value) => {
    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    if (!isEmail) {
      throw new Error("Please enter a proper email address");
    }
    const uniquEmail = await User.findOne({ email: value })
    .lean()
    .exec();
  if (uniquEmail) {
  
  return true;
 }
 }),
 body("password").isLength({min:8}).withMessage("password must be at least 8 characters required"),


 async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let customError=errors.array().map(({msg,param,location})=>{
            return{
                [param]:msg,
            };
        });
        return res.status(400).json({ errors:customError });
      }

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

 })



 module.exports =router;


