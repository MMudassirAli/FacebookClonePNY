import { Button, Typography } from '@mui/material'
import {useDispatch, useSelector} from "react-redux"
import React, { useEffect, useRef, useState } from 'react'
import { addFriendRequest, requestReset } from '../../../features/requests/requestSlice'
import {toast} from "react-hot-toast";
import { ProgressBar } from 'react-loader-spinner';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001")

const UserList = ({f_name,l_name,image,_id}) => {
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.user)
    const [btnState,setBtnState] = useState({text:"Add Friend",disabled:false})
    const [loading,setLoading] = useState(false);
    const {requestLoading,requestError,requestSuccess,requestMessage,requests} = useSelector((state)=>state.requests);
    const btnRef = useRef()

    useEffect(()=>{
        if(requestError){
            toast.error(requestMessage)
        }

        dispatch(requestReset())
    },[requestError])

    const handleRequest = async(id) => {
        try {
            setLoading(true)
            socket.emit("add_friend",{from_id:user._id,to_id:id})
            await dispatch(addFriendRequest(id))
            // toast.success("Friend Request Sent Successfully!")
            setBtnState({text:"Requested",disabled:true})
        } catch (error) {
            // toast.error("Request Cancelled!")
        }finally{
            setLoading(false)
        }
    }

  return (
    <>
    <div className="d-flex align-items-center new-request gap-2 px-2 py-1 rounded-3">
            <div className="user-image">
                <img src={image ? image : "/icons/userreal.png"} width={50} height={50} alt="user image" className='rounded-circle' />
            </div>
            <div className="user-request w-100">
                <div className="d-flex align-items-center justify-content-between">
                    <Typography variant='h6' className='fs-6 text-capitalize' >
                        {f_name} {l_name}
                    </Typography>
                    {/* <Typography variant='h6' className='text-md text-primary time' >
                        6m
                    </Typography> */}
                </div>
                <div className="d-flex gap-2 w-100">
                    <Button ref={btnRef} sx={{ textTransform:"capitalize",width:"max-content" }} onClick={()=>handleRequest(_id)} variant="contained" className=' w-75' >
                        {
                        loading ? (<>
                        <ProgressBar
                            visible={true}
                            disabled={btnState?.disabled}
                            height="25"
                            width="100"
                            color="#4fa94d"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            />
                            </>
                            ) : (<>{btnState?.text}</>)
                        }
                    </Button>
                    <Button sx={{ textTransform:"capitalize",width:"max-content" }} variant="contained" className="dark-grey text-dark w-75" >Remove</Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserList