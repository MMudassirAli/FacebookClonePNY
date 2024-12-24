const express = require("express");
const {  addFriend } = require("../controllers/requestController");
const authMiddleware = require('../middlewares/authMiddleware')

const requestRouter = express.Router();

requestRouter.post("/add-friend-request/:to",authMiddleware, addFriend);

module.exports = requestRouter;