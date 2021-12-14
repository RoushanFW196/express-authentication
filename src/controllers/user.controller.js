
const express=require('express');

const User = require('../models/user.model.js')
const router=express.Router();

router.get("/",async (req,res)=>{
    const allusers= await User.find({}).lean().exec();

    return res.status(200).json({data:allusers});
})




module.exports = router;