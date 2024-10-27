require("dotenv").config();
require("colors");

const express = require("express");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorMiddlewares");
const connectDB = require("./config/connect");
const app = express();

connectDB();


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/user/", userRouter);
app.use("/api/user/", userRouter);
app.use(errorHandler);

app.listen(process.env.PORT,()=>console.log(`Server started on port:${process.env.PORT.yellow}`));