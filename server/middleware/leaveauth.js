const express = require('express');
const jwt =require("jsonwebtoken");
const {Employee} = require("../model/userSchema");

const leaveauth = async (req, res, next)=>{
   try{

    const token = req.cookies.jwtokenemp;
    const verifyToken= jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await Employee.findOne({ _id: verifyToken._id, "tokens.token" : token});
    
    if(! rootUser) { throw new Error('User not found')}

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    req.empId=rootUser.empId;
    req.firstName = rootUser.firstName;
    req.lastName = rootUser.lastName;

    next();
    
   }catch(err){

       res.status(401).send('Unauthorized: No token provided');
       console.log(err);
   }
}
module.exports =leaveauth;