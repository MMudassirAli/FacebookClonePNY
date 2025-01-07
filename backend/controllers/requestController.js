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
        await requestmodel.deleteOne({_id : existingRequest._id});
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
    const id = req.user._id;
    const myRequests = await requestmodel.find({
        "sendRequests.from" : id
    });
    res.send(myRequests)
});

const rejectRequest = asyncHandler(async(req,res)=>{
    const {from,to} = req.body
    // console.log(from,to)
    const findRequest = await requestmodel.findOne({
        "sendRequests.from" : from,
        "sendRequests.to" : to,
    });

    if(findRequest){
        await findRequest.deleteOne({_id:findRequest._id})
        res.send(findRequest)
    }
})

module.exports = {
    addFriend,
    getMyRequests,
    rejectRequest,
};