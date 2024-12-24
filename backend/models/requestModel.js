const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
    recievedRequests:[
        {
            from:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
            to:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
        },
    ],
    sendRequests:[
        {
            from:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
            to:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
        },
    ],
},
    {timestamps:true}
);

module.exports = mongoose.model("Requests", requestSchema);