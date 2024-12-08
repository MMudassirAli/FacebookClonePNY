const express = require('express');
const { uploadPost, getPosts } = require('../controllers/postController');
const authMiddleware = require("../middlewares/authMiddleware");
const postRouter = express.Router();

postRouter.post('/upload-post',authMiddleware, uploadPost);
postRouter.get('/get-posts', getPosts);

module.exports = postRouter;