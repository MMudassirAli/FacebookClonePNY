import React from 'react'
import {useSelector} from "react-redux"
import {Typography} from "@mui/material"
import moment from "moment"
import { BsDot } from 'react-icons/bs'
import { FaGlobeAmericas, FaLock, FaUserFriends, FaThumbsUp } from 'react-icons/fa';
import { BsThreeDots } from "react-icons/bs"
import { GoHeartFill, GoThumbsup } from "react-icons/go"
import { BiChat, BiLogoWhatsapp } from 'react-icons/bi'
import { PiShareFat } from "react-icons/pi"
import { IoChatbubbleOutline } from "react-icons/io5"
import PostPopover from './PostPopover'

const MyPosts = ({createdAt,visibility,content,caption}) => {
    const {user} = useSelector((state)=>state.user);
  return (
    <>
    <div className="card my-2 shadow border-0">
        <div className="d-flex p-2 justify-content-between align-items-center me-2">
            <div className="d-flex gap-2 align-items-center ">
                <img src={
                    user?.image ? user?.image : "/icons/userreal.png"
                } width={30} height={30} alt="User Image" className="rounded-circle" />
                <div className="d-flex flex-column">
                    <Typography variant='h2' className='text-md m-0 fw-semibold'>
                        {user?.f_name+ " " +user?.l_name}
                    </Typography>
                    <div className="d-flex align-items-center">
                    <Typography variant='p' className='text-sm text-secondary'>
                        {moment(createdAt).format('lll')}
                    </Typography>
                    <BsDot className='text-secondary'/>
                    { visibility == "public" && <FaGlobeAmericas size={12} className='text-secondary' /> }
                    { visibility == "friends" && <FaUserFriends size={12} className='text-secondary' /> }
                    { visibility == "only_me" && <FaLock size={12} className='text-secondary' /> }
                    </div>
                </div>
            </div>
            <PostPopover/>
        </div>
        <div className="caption">
            <Typography className='p-1 px-2'>
                {caption}
            </Typography>
        </div>
        <div className="post-image my-1">
            <img src={content} width={"100%"} height={"540px"} alt="Post COntent" style={{ objectFit: "cover" }} />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex ps-2">
                <div className="p-1 d-flex justify-content-center z-1 align-items-center rounded-full" style={{ background: "#117DFE" }} >
                    <FaThumbsUp color='white' size={11} />
                </div>
                <div className="p-1 d-flex justify-content-center align-items-center rounded-full" style={{ background: "#FC4A50", marginLeft : "-0.4rem" }} >
                    <GoHeartFill color='white' size={11} />
                </div>
                <Typography className='text-md fw-semibold text-secondary ms-1'>26</Typography>
            </div>
            <div className="d-flex gap-2 align-items-center me-2" >
            <Typography className='text-sm fw-semibold text-secondary'> 26 Comments</Typography>
            <Typography className='text-sm fw-semibold text-secondary'> 26 Shares</Typography>
            </div>
        </div>
       <hr className='m-0' />
            <div className="d-flex justify-content-between  p-2">
                <div className="d-flex w-100 justify-content-center align-items-center gap-1">
                    <GoThumbsup size={19} />
                    <Typography className='text-md text-secondary'>
                        Like
                    </Typography>
                </div>
                <div className="d-flex w-100 justify-content-center align-items-center gap-1">
                    <IoChatbubbleOutline size={19} />
                    <Typography className='text-md text-secondary'>
                        Comment
                    </Typography>
                </div>
                <div className="d-flex w-100 justify-content-center align-items-center gap-1">
                    <BiLogoWhatsapp size={19} />
                    <Typography className='text-md text-secondary'>
                        Whatsapp
                    </Typography>
                </div>
                <div className="d-flex w-100 justify-content-center align-items-center gap-1">
                    <PiShareFat size={19} />
                    <Typography className='text-md text-secondary'>
                        Share
                    </Typography>
                </div>
            </div>
    </div>
    </>
  )
}

export default MyPosts