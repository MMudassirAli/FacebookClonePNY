const express = require("express");
const { registerUser, loginUser, verifyOTP } = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/register-user", registerUser);
userRouter.post("/login-user", loginUser);
userRouter.post("/verify-otp/:user_id", verifyOTP);

module.exports = userRouter;