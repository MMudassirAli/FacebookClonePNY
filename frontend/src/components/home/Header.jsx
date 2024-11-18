import React, { useEffect, useState } from 'react'
import logo from "../../assets/images/fb-logo.png"
import {BiSearch} from "react-icons/bi"
import { AiOutlineHome } from "react-icons/ai";
import { RxVideo } from "react-icons/rx";
import { BsShop } from "react-icons/bs";
import { SlPeople } from "react-icons/sl";
import { GrGamepad } from "react-icons/gr";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaFacebookMessenger, FaUser } from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { RiArrowDropDownLine } from "react-icons/ri";
import ProfileDown from './ProfileDown';


const Header = () => {

    const {user} = useSelector((state)=>state.user);
    const [showPopUp, setShowPopUp] = useState(false);

    const [size,setSize] = useState(window.innerWidth);

    const changeSize = () => {
        setSize(window.innerWidth)
    };

    useEffect(()=>{
        window.addEventListener("resize",changeSize);

        return()=>{
            window.removeEventListener("resize",changeSize);
        };
    });

  return (
    <>
    <div className="d-flex px-2 bg-white align-items-center justify-content-between shadow-sm">
        <div className="search d-flex align-items-center justify-content-center ">
            <img width={47} src={logo} alt="FaceBook Logo" />
            <div className="d-flex bg-lights border-0 form-control rounded-pill py-1 gap-1 align-items-center justify-content-center">
                <BiSearch size={20} className='text-secondary' />
                {size >= 1260 && (<input type="search" className='border-0 outline-0 bg-lights' placeholder='Search Facebook'  />)}
            
            </div>
        </div>

        {size >= 700 && (
            <ul className="menu-items m-0 d-flex list-unstyled justify-content-between w-35 fw-bold">
            <li> <AiOutlineHome size={22} className='text-secondary-emphasis' /> </li>
            <li> <RxVideo size={22} className='text-secondary-emphasis' /> </li>
            <li> <BsShop size={22} className='text-secondary-emphasis' /> </li>
            <li> <SlPeople size={22} className='text-secondary-emphasis' /> </li>
            <li> <GrGamepad size={22} className='text-secondary-emphasis' /> </li>
        </ul>
        )}

        <div className="right-icons d-flex gap-2">
            <div className="p-2 bg-lights rounded-full">
                <BsFillGrid3X3GapFill size={18} />
            </div>

            <div className="position-relative">
            <div className="p-2 bg-lights rounded-full">
                <FaFacebookMessenger size={18} />
            </div>
            <span className="notification text-sm end-0 bg-danger position-absolute p-1 rounded-full text-center text-white" style={{ top: "-6px" }}>1</span>
            </div>

            <div className="position-relative">
            <div className="p-2 bg-lights rounded-full">
                <BsBellFill size={18} />
            </div>
            <span className="notification text-sm end-0 bg-danger position-absolute p-1 rounded-full text-center text-white" style={{ top: "-6px" }}>1</span>
            </div>
            <div className="position-relative drop-pop">
                {user?.image ? (
                    <img src={user?.image} alt="user image" width={25} className='rounded-full' />
                ) : (
                    <div onClick={()=>setShowPopUp(true)} className="position-relative drop-pop" >
                        <div className="rounded-full p-2 bg-lights drop-pop">
                        <FaUser className='drop-pop' size={18} />
                        </div>
                        <div className="drop position-absolute rounded-full drop-pop" style={{ bottom: "-5px", right: "-3px" }} >
                        <RiArrowDropDownLine size={20} className='bg-lights border border-white drop-pop' />
                        </div>
                    </div>
                )}
                {
                    showPopUp && <ProfileDown setShowPopUp={setShowPopUp} />
                }
            </div>
        </div>
    </div>
    </>
  )
}

export default Header