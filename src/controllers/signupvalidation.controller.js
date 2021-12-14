

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
 body("name").notEmpty().withMessage("name is required") ,
 
 
 body("email").custom( async (value) => {
    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    if (!isEmail) {
      throw new Error("Please enter a proper email address");
    }
    const uniquEmail = await User.findOne({ email: value })
    .lean()
    .exec();
  if (uniquEmail) {
    throw new Error("Please try with a different email address");
  }
  return true;
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
  const adduser= await User.create(req.body);
  const token =newToken(adduser)
  return res.status(201).json({adduser, token });
    }
   catch(e){
 return res.status(500).json({status:"failed",message:"something wrong happen"})
  }

 })



 module.exports =router;


