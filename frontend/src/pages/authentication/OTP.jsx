import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
import {useDispatch, useSelector} from "react-redux";
import { userReset, verifyOtpData } from '../../features/Users/userSlice';
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const OTP = () => {
    const [otp, setOtp] = useState('');
    const {user, userError, userMessage, userSuccess} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(user?.otp == null){
            navigate("/");
        }
    },[])

    useEffect(()=>{

        if(userError){
            toast.error(userMessage);
        }

        if(userSuccess){
            toast.success("OTP Verified Successfully!")
            navigate("/home");
        }

        dispatch(userReset())

    },[userError,userSuccess,dispatch]);

    const verifyOTP = () => {
        const otpData = {otp, user_id : user?._id};

        dispatch(verifyOtpData(otpData))
    };


  return (
    <>
    <Container className='d-flex justify-content-center align-items-center height-60'>
    <div className="card border-0 w-50 p-3 shadow">
        <div className="otp">
            <h4 className='text-center mb-4'>Enter 6 Digit Code to Verify!</h4>
        <OtpInput
        inputType='tel'
    inputStyle={{ padding:"1rem", width: "50px", margin: "auto", borderRadius: "5px" }}
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span></span>}
      renderInput={(props) => <input {...props} />}
    />
    </div>
    <div className="d-flex justify-content-around align-items-center mt-4">
    <Button variant='contained' className='bg-danger'>Clear</Button>
    <Button onClick={verifyOTP} variant='contained' className='bg-success'>Verify</Button>
    </div>
        </div>
    </Container>
    </>
  )
}

export default OTP