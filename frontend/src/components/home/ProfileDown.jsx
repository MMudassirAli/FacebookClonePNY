import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import {Typography} from "@mui/material";
import { BsGear, BsGearFill } from 'react-icons/bs';
import { RiArrowRightSLine } from "react-icons/ri";
import { MdHelp } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";


const ProfileDown = ({setShowPopUp}) => {

    const {user} = useSelector((state)=>state.user);
    
  return (
    <>
    <div onClick={()=>setShowPopUp(false)} className="underlay position-fixed top-0 start-0" style={{ 
        height: "100vh", width: "100vw", zIndex: "2",
     }} ></div>
    <div className='card position-absolute p-2 shadow ' style={{ 
        left: "-225px", zIndex: "4",
     }} >
        <div className="card p-2 chori shadow border-0 rounded-2">
            <div className="d-flex gap-3 align-items-center">
                {user?.image ? (
                    <>
                    <img src={user?.image} alt="user image" width={20} className='rounded-full' />
                    <Typography variant='p' className='text-md fw-semibold' >{user?.f_name} {user?.l_name} </Typography>
                    </>
                ) : (
                    <>
                        <FaUser size={18} />
                        <Typography variant='p' className='text-md fw-semibold' >{user?.f_name} {user?.l_name} </Typography>
                    </>
                )}
            </div>
        </div>

        <div className="d-flex mt-2 mb-1 align-items-center justify-content-between">
            <div className="d-flex gap-1 align-items-center">
                <div className="p-2 bg-lights rounded-circle">
                <BsGearFill size={23} />
                </div>
                <Typography variant='p' className='text-md fw-semibold'>Settings & privacy</Typography>
            </div>
            <RiArrowRightSLine size={25} />
        </div>
        <div className="d-flex mt-2 mb-1 align-items-center justify-content-between">
            <div className="d-flex gap-1 align-items-center">
            <div className="p-2 bg-lights rounded-circle">
                <MdHelp size={23} />
                </div>
                <Typography variant='p' className='text-md fw-semibold'>Help & support</Typography>
            </div>
            <RiArrowRightSLine size={25} />
        </div>
        <div className="d-flex mt-2 mb-1 align-items-center justify-content-between">
            <div className="d-flex gap-1 align-items-center">
            <div className="p-2 bg-lights rounded-circle">
                <FaMoon size={23} />
                </div>
                <Typography variant='p' className='text-md fw-semibold'>Display & accessibility</Typography>
            </div>
            <RiArrowRightSLine size={25} />
        </div>
        <div className="d-flex mt-2 mb-1 align-items-center justify-content-between">
            <div className="d-flex gap-1 align-items-center">
            <div className="p-2 bg-lights rounded-circle">
                <MdFeedback size={23} />
                </div>
                <Typography variant='p' className='text-md fw-semibold'>Give feedback</Typography>
            </div>
            <RiArrowRightSLine size={25} />
        </div>
        <div className="d-flex mt-2 mb-1 align-items-center justify-content-between">
            <div className="d-flex gap-1 align-items-center">
            <div className="p-2 bg-lights rounded-circle">
                <GiExitDoor size={23} />
                </div>
                <Typography variant='p' className='text-md fw-semibold'>Log Out</Typography>
            </div>
            <RiArrowRightSLine size={25} />
        </div>
     </div>
     </>
  )
}

export default ProfileDown