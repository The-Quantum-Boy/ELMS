const express = require('express');
const jwt =require("jsonwebtoken");
const { Admin} = require("../model/userSchema");
const admnauth= async (req, res, next)=>{
   try{

    const token = req.cookies.jwtokenemp;
    const verifyToken= jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await Admin.findOne({ _id: verifyToken._id, "tokens.token" : token});
    // const leaveHistory = Leaves.find();
    if(! rootUser) { throw new Error('Login please')}

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    // req.leaveHistory=leaveHistory;
    next();
    
   }catch(err){

       res.status(401).send('Unauthorized: No token provided');
       console.log(err);
   }
}
module.exports = admnauth;