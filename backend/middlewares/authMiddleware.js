const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
        //Decode the Token
        let decode = await jwt.verify(token,process.env.JWT_SECRET);
        req.user = await userModel.findById(decode.id);

        next();
    }else{
        res.status(401);
        throw new Error("Session Expired");
    }
});

module.exports = authMiddleware;
