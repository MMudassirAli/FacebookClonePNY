const express = require("express");
const { registerUser } = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/register-user", registerUser);

module.exports = userRouter;