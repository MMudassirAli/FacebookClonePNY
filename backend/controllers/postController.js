const asyncHandler = require("express-async-handler");
const postModel = require("../models/postModel");

const uploadPost = asyncHandler(async(req,res)=>{
    const {content,caption,visibility} = req.body; 
    const user_id = req.user._id;
    const createdPost = await postModel.create({
        content,
        caption,
        user_id,
        visibility,
    });
    res.send(createdPost);
});

const getPosts = asyncHandler(async(req,res)=>{
    const myPosts = await postModel.find();
    res.send(myPosts);
})

module.exports = {
    uploadPost,
    getPosts,
};