const asyncHandler = require("express-async-handler");
const requestmodel = require("../models/requestmodel");

const addFriend = asyncHandler(async(req,res)=>{
    const to = req.params.to;
    const from = req.user._id;

    const existingRequest = await requestmodel.findOne({
        "sendRequests.from": from,
        "sendRequests.to": to,
    });

    if(existingRequest){
        // existingRequest.sendRequests = existingRequest.sendRequests.filter((request,index)=>{
        //     return !(request.from.toString() == from.toString() && request.to.toString() == to.toString());
        // });
        await requestmodel.deleteOne({_id : existingRequest._id});
        // await existingRequest.save();
        // res.send("Request Cancelled");
        res.status(400);
        throw new Error("Request Cancelled!");
    }else{
        const newRequest = await requestmodel.create({
        sendRequests: [{from,to}],
        recievedRequests: [{from:to, to:from}],
    });
    res.send(newRequest)
}});

const getMyRequests = asyncHandler(async(req,res)=>{
    const user_id = req.user._id;
    const myRequests = await requestmodel.find({
        "sendRequests.from" : user_id
    });
    res.send(myRequests)
})

module.exports = {
    addFriend,
    getMyRequests,
};