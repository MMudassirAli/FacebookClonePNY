import { Button, IconButton } from '@mui/material';
import React from 'react'
    import { FaBell, FaTimes } from 'react-icons/fa';
    import { useDispatch, useSelector } from 'react-redux'
    import {IoClose} from "react-icons/io5"
    import "../requests/request.css"
import { rejectRequestData } from '../../../features/requests/requestSlice';
import { ProgressBar } from 'react-loader-spinner';

    const RequestPopUp = ({from_id,to_id,newRequest,setNewRequest}) => {
        const {allUsers} = useSelector((state)=>state.user)
        const {requestLoading} = useSelector((state)=>state.requests)
        const dispatch = useDispatch();
        const findUser = allUsers?.find((item,index)=>{
            return item?._id == from_id
        });
    return (
        <div
        className="notification-popup container position-fixed bg-white shadow rounded-4 p-2 "
        style={{ maxWidth: "320px", bottom:"20px", left:"20px", transition:"all 0.7s",
        transform:`${ newRequest ? "translateY(0)" : "translateY(120%)" }`,
        opacity:`${newRequest ? "1" : "0"}`,
        zIndex:"333", backgroundColor: "red" }}
        >
        <button onClick={()=>setNewRequest(false)}
            className="btn btn-light position-absolute top-0 end-0 m-1 rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "44px", height: "44px" }}
            
        >
            <IconButton>
                <IoClose />
            </IconButton>
            {/* <FaTimes size={24} className="text-secondary" /> */}
        </button>

        <div className="notification text-center">
            <h2 className="h4 mb-4 text-primary">New Friend Request</h2>
            <div className="notification-icon d-flex ms-4 align-items-center gap-2 justify-content-start mb-4">
            <div
                className="d-flex justify-content-center align-items-center text-white rounded-3"
                style={{ width: "50px", height: "50px", background: "linear-gradient(to bottom right, #9ab0ff, #eb73ff)" }}
            >
                {/* <FaBell size={22} /> */}
                <img width={70} height={70} className='rounded-circle' src={findUser?.image ? findUser?.image : "/icons/userreal.png"} alt="User Image" />
            </div>
            <p className="ms-3 text-white fs-5 mb-0">{findUser?.f_name} {findUser?.l_name}</p>
            </div>
            <div className="button-container d-flex justify-content-end gap-2">
            <Button
                className="btn btn-outline-success"
            >
                Accept
            </Button>
            <Button
            disabled={requestLoading}
            onClick={async()=>{dispatch( await rejectRequestData({
                from:from_id,
                to:to_id
            }));
            setNewRequest(false)
        }}
                className={`btn btn-outline-danger ${requestLoading && "btn-disabled"}  `}
            >
                {
                    requestLoading ? (
                        <>
                    <ProgressBar
                        visible={true}
                        height="25"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        />
                        </>
                    ) : (
                        <>
                        "Reject"
                        </>
                    )
                }
            </Button>
            
            </div>
        </div>
        </div>
    );
    }

    export default RequestPopUp