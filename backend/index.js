require("dotenv").config();
require("colors");

const express = require("express");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorMiddlewares");
const connectDB = require("./config/connect");
const app = express();
const http = require("http")
const {Server} = require("socket.io")

const cors = require('cors');
const postRouter = require("./routes/postRoutes");
const requestRouter = require("./routes/requestRoutes");
app.use(cors());
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Make Your Socket Server

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["POST","GET","PUT","DELETE"]
    }
});


io.on("connection",(socket)=>{
    console.log(`User Connected on Host: ${socket.id.blue}`)

    socket.on("add_friend",(data)=>{
        socket.broadcast.emit("show_request",data)
        // console.log(data)
    })
});


app.use("/api/user/", userRouter);
app.use("/api/posts/", postRouter);
app.use("/api/requests/", requestRouter);

app.use(errorHandler);

server.listen(process.env.PORT,()=>console.log(`Server started on port:${process.env.PORT.yellow}`));