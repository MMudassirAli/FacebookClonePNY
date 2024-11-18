import React, { useState } from 'react'
import { sidebarData } from '../../data/SidebarData'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from 'react-icons/fa';


const Sidebar = () => {
    const {user} = useSelector((state)=>state.user);
    const username = user?.f_name + " " + user?.l_name;
    const [number,setNumber] = useState(8)


  return (
    <>
    <div className="height-100 bg-lights">
        <ul className="list-unstyled d-flex flex-column">
            <li className='d-flex cursor-pointer align-items-center py-2 px-3 gap-3 sidebar-list rounded-2'>
            <div className="icon-image">
                            <img width={24} src={`${user?.image ? user?.image : "/icons/userreal.png" }`} alt="" />
                        </div>
                        <div className="text">
                            <Typography variant='p' className='text-md fw-semibold'>
                            {username.length > 3 ? username.slice(0,3) + " ..." : user?.l_name}
                            </Typography>
                        </div>
            </li>
            {
                sidebarData?.slice(0,number)?.map((item,index)=>{
                    return <li key={item?.id} className='d-flex align-items-center py-2 px-3 gap-3 sidebar-list rounded-2 cursor-pointer' >
                        <div className="icon-image">
                            <img width={24} src={item?.image} alt="" />
                        </div>
                        <div className="text">
                            <Typography variant='p' className='text-md fw-semibold'>
                            {item?.title}
                            </Typography>
                        </div>
                    </li>
                })
            }
            <div onClick={
                number == 8 ? ()=>setNumber(sidebarData.length) : ()=>setNumber(8)
            } className="d-flex align-items-center px-3 py-2 gap-2 sidebar-list cursor-pointer">
        <div className=" bg-lights rounded-full p-1 dark-grey">
            {number == 8 ? (
                <FaChevronDown/>
            ) : (
                <FaChevronUp/>
            )}
                
        </div>
                <Typography variant='p' className='text-md fw-semibold'>
                    {
                        number == 8 ? "See more" : "See less"
                    }
                </Typography>
        </div>
        </ul>
    </div>
    </>
  )
}

export default Sidebar