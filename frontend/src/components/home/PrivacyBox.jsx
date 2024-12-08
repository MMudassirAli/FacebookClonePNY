import { Input, Typography } from '@mui/material';
import React from 'react'
import { BsArrowLeft } from "react-icons/bs";
import { FaGlobeAmericas, FaLock, FaUserFriends } from 'react-icons/fa';

const PrivacyBox = ({showPrivacyBox,setShowPrivacyBox,visibility,setVisibility}) => {
  return (
    <>
    <div style={{ 
        transform: `${showPrivacyBox ? "translateX(0)" : "translateX(100%)"}`,
        opacity: `${showPrivacyBox ? "1" : "0"}`
     }} className="position-absolute transition-lg p-3 card top-0 shadow-lg end-0 h-100 border-0 w-100">
        <div className="d-flex align-items-center p-1">
            <div onClick={()=>setShowPrivacyBox(false)} className="p-2 rounded-full cursor-pointer dark-grey d-flex align-items-center justify-content-center position-absolute">
            <BsArrowLeft/>
            </div>
        <Typography variant='p' className='fw-semibold w-100 text-center' >Post Audience</Typography>
        </div>
        <hr />
        <Typography variant='p' className='fw-semibold'>Who can see your post?</Typography>
        <Typography variant='p' className='text-secondary text-md mb-2'>Your post will show up in Feed, on your profile and in search results.</Typography>
        <Typography variant='p' className='text-secondary text-md'>Your default audience is set to Public, but you can change the audience of this specific post.</Typography>

        <div className="d-flex my-3 justify-content-between align-items-center">
            <div className="d-flex gap-2 align-items-center">
            <div className="p-2 rounded-full dark-grey d-flex align-items-center justify-content-center">
            <FaGlobeAmericas size={20}/>
            </div>
            <div className="d-flex flex-column">
                <Typography variant='h6' className='fw-semibold text-md m-0'>Public</Typography>
                <Typography variant='p' className='text-md text-secondary m-0'>Anyone on or off Facebook</Typography>
            </div>
            </div>
            <input onChange={(e)=>setVisibility(e.target.value)} value="public" className='form-check type-radio cursor-pointer' name='type' type='radio' />
        </div>
        <div className="d-flex my-3 justify-content-between align-items-center">
            <div className="d-flex gap-2 align-items-center">
            <div className="p-2 rounded-full dark-grey d-flex align-items-center justify-content-center">
            <FaUserFriends size={20}/>
            </div>
            <div className="d-flex flex-column">
                <Typography variant='h6' className='fw-semibold text-md m-0'>Friends</Typography>
                <Typography variant='p' className='text-md text-secondary m-0'>Your friends on Facebook.</Typography>
            </div>
            </div>
            <input onChange={(e)=>setVisibility(e.target.value)} value="friends" className='form-check type-radio cursor-pointer' name='type' type='radio' />
        </div>
        <div className="d-flex my-3 justify-content-between align-items-center">
            <div className="d-flex gap-2 align-items-center">
            <div className="p-2 rounded-full dark-grey d-flex align-items-center justify-content-center">
            <FaLock size={20}/>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <Typography variant='h6' className='fw-semibold text-md m-0'>Only me</Typography>
            </div>
            </div>
            <input onChange={(e)=>setVisibility(e.target.value)} value="only_me" className='form-check type-radio cursor-pointer' name='type' type='radio' />
        </div>
    </div>
    </>
  )
}

export default PrivacyBox