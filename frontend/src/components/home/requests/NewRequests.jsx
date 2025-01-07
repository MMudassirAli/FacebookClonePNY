import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getAllUsersData, userReset } from "../../../features/Users/userSlice";
import {
  myRequestsData,
  requestReset,
} from "../../../features/requests/requestSlice";
import io from "socket.io-client";
import RequestPopUp from "../requests/RequestPopUp";
const socket = io.connect("http://localhost:3001")

const NewRequests = () => {
  const { userLoading, user, userError, userSuccess, userMessage, allUsers } =
    useSelector((state) => state.user);
  const { requests, requestSuccess } = useSelector((state) => state.requests);
  const [newRequest,setNewRequest] = useState(false)
  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch();
  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    }

    dispatch(requestReset());
    dispatch(userReset());
    dispatch(getAllUsersData());
    dispatch(myRequestsData());
  }, []);
 
  const filteredUsers = allUsers?.filter((user)=>{
    return !requests?.some((request)=>
    request?.sendRequests?.some(
      (sendRequest) => sendRequest?.to === user?._id
    )
    )
  })
  // console.log(filteredUsers)

  useEffect(()=>{
    socket.on("show_request",(data)=>{
        if(data?.to_id == user?._id){
            setNewRequest(true)
            const audio = new Audio("/sounds/notification.wav")
            audio.play()
            setUserData(data)
        }
    })
},[socket])

  return (
    <>
      {
        <RequestPopUp setNewRequest={setNewRequest} newRequest={newRequest} {...userData} />
      }
      <div className="d-flex pt-2 align-items-center justify-content-between px-1">
        <Typography className="m-0 text-md text-secondary" variant="h6">
          Friend requests
        </Typography>
        <Typography className="text-primary m-0 text-md">See All</Typography>
      </div>
      <div className="d-flex align-items-center new-request gap-2 px-2 py-1 rounded-3">
        <div className="user-image">
          <img
            src="https://scontent.fmux3-1.fna.fbcdn.net/v/t1.6435-1/152420119_1080751225753234_1184027650119132473_n.jpg?stp=c0.46.480.480a_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=mZUOudYz2s4Q7kNvgEUpZo6&_nc_zt=24&_nc_ht=scontent.fmux3-1.fna&_nc_gid=AzQN4LzqQSo_DTHQtXY3P3O&oh=00_AYAAoFAlr904esT_UnGSWBxbrnPnu9nuRcohFSKEi9RXHw&oe=678A0861"
            width={50}
            height={50}
            alt="user image"
            className="rounded-circle"
          />
        </div>
        <div className="user-request w-100">
          <div className="d-flex align-items-center justify-content-between">
            <Typography variant="h6" className="fs-6">
              user name
            </Typography>
            <Typography variant="h6" className="text-md text-primary time">
              6m
            </Typography>
          </div>
          <div className="d-flex gap-2 w-100">
            <Button
              sx={{ textTransform: "capitalize", width: "max-content" }}
              variant="contained"
              className=" w-75"
            >
              Confirm
            </Button>
            <Button
              sx={{ textTransform: "capitalize", width: "max-content" }}
              variant="contained"
              className="dark-grey text-dark w-75"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      <hr />

      {filteredUsers?.map((item, index) => {
        return <UserList key={index} {...item} />;
      })}
    </>
  );
};

export default NewRequests;
