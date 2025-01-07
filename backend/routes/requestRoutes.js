const express = require("express");
const {  addFriend, getMyRequests, rejectRequest } = require("../controllers/requestController");
const authMiddleware = require('../middlewares/authMiddleware')

const requestRouter = express.Router();

requestRouter.post("/add-friend-request/:to",authMiddleware, addFriend);
requestRouter.get("/my-requests",authMiddleware,getMyRequests);
requestRouter.delete("/reject-request", rejectRequest)

module.exports = requestRouter;