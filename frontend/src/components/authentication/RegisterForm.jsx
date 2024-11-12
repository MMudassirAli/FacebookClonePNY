import React, { useState } from 'react';
import {Button, Card} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import { Form } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux" ;
import { registerUserData, userReset } from '../../features/Users/userSlice';
import toast from "react-hot-toast";
import {ProgressBar} from "react-loader-spinner";

const RegisterForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // Get the data from the Store
    const {userMessage, userError, userLoading, userSuccess} = useSelector((state)=>state.user)

    useEffect(()=>{
        if(userError){
            toast.error(userMessage)
        }

        if(userSuccess){
            navigate("/otp");
            toast.success("Please Verify OTP");
        }


        dispatch(userReset());
    },[userError,dispatch,userSuccess])

    const [months] = useState([
        'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',
    ]);
    const [formfields,setFormfields] = useState({
        f_name:'',
        l_name:'',
        date: new Date().getDate(),
        month: months[new Date().getMonth()],
        year: new Date().getFullYear(),
        gender:'',
        m_mail:'',
        password:'',
    });

    const {f_name,l_name,date,month,year,gender,m_mail,password} = formfields;

    const [years,setYears] = useState([]);
    const getCurrentYear = new Date().getFullYear();
    const getStartYear = 1905;

    useEffect(()=>{
        const YearsArray = [];
        for(let i = getCurrentYear; i >= getStartYear; i--){
            YearsArray.push(i)
        }
        setYears(YearsArray);
    },[])

    const handleChange = (e) => {
        setFormfields({
            ...formfields,
            [e.target.name] : e.target.value,
        })
    };


    //Handle the Registration of User

    const handleRegister = async(e) => {
        e.preventDefault();

        const userData = {
            f_name, l_name, m_mail, password, gender, dob: `${date}-${month}-${year}`
        }

        dispatch(registerUserData(userData))
        // const response = await fetch("http://localhost:3001/api/user/register-user",{
        //     method: 'POST',
        //     headers: {
        //         'content-Type' : 'application/json'
        //     },
        //     body:JSON.stringify({
        //         f_name,l_name,gender,m_mail,password,dob:`${date}-${month}-${year}`
        //     })
        // });
        // const data = await response.json();
        // console.log(data);

        //Send Request through Axios

        // const dataForBE = {f_name,l_name,gender,m_mail,password,dob:`${date}-${month}-${year}`};

        // const response = await axios.post('http://localhost:3001/api/user/register-user',dataForBE);

        // localStorage.setItem('user',JSON.stringify(response.data))
        
    }

  return (
    <>
    
    <Card className='p-3 shadow border-0 rounded-3 col-lg-4 col-md-7 col-sm-9 mx-auto'>
        <Form>
            <h4 className='text-center m-0 fw-bold'>Create a new account</h4>
            <p className="text-secondary text-center">It's quick and easy.</p>
            <hr />
            <div className="d-flex gap-2">
                <Form.Control value={f_name} onChange={handleChange} className='shadow-0 outline-blue' placeholder='First name' type='text' name='f_name' />
                <Form.Control value={l_name} onChange={handleChange} className='shadow-0 outline-blue' placeholder='Surname' type='text' name='l_name' />
            </div>
            <Form.Label className='text-secondary my-2 text-md'>
                Date of birth <span className="bg-secondary text-white p-1 border-none rounded-full text-sm">?</span>
            </Form.Label>
            <div className="d-flex gap-2">
                <Form.Select className='outline-blue shadow-0' value={date} name='date' onChange={handleChange}>
                    {
                        Array.from({length:31}).map((_,index)=>{
                            return <option key={index} value={index + 1}>
                                {index + 1}
                            </option>
                        })
                    }
                </Form.Select>
                <Form.Select className='outline-blue shadow-0' value={month} name='month' onChange={handleChange}>
                    {
                        months.map((item,index)=>{
                            return <option key={index} value={item}>
                                {item}
                            </option>
                        })
                    }
                </Form.Select>
                <Form.Select className='outline-blue shadow-0' value={year} name='year' onChange={handleChange}>
                    {
                        years.map((item,index)=>{
                            return <option key={index} value={item}>
                                {item}
                            </option>
                        })
                    }
                </Form.Select>
            </div>
            <Form.Label className='text-secondary my-2 text-md'>
                Gender <span className="bg-secondary text-white p-1 border-none rounded-full text-sm">?</span>
            </Form.Label>
            <div className="d-flex gap-2 align-items-center justify-content-between">
                <div className="border px-2 py-1 rounded-3 w-100 d-flex align-items-center justify-content-between">
                    <Form.Label className='m-0'>Female</Form.Label>
                    <input onChange={handleChange} type="radio" name='gender' value='female' className="form-check" />
                </div>
                <div className="border px-2 py-1 rounded-3 w-100 d-flex align-items-center justify-content-between">
                    <Form.Label className='m-0'>Male</Form.Label>
                    <input onChange={handleChange} type="radio" name='gender' value='male' className="form-check" />
                </div>
                <div className="border px-2 py-1 rounded-3 w-100 d-flex align-items-center justify-content-between">
                    <Form.Label className='m-0'>Custom</Form.Label>
                    <input onChange={handleChange} type="radio" name='gender' value='custom' className="form-check" />
                </div>
            </div>
            <Form.Control type='text' placeholder='Mobile number or email address' name='m_mail' value={m_mail} onChange={handleChange} className='mt-3 shadow-0 outline-blue'  />
            <Form.Control type='password' placeholder='New password' name='password' value={password} onChange={handleChange} className='mt-2 shadow-0 outline-blue'  />
            <p className="text-secondary text-sm mt-3">People who use our service may have uploaded your contact information to Facebook. Learn more.</p>
            <p className="text-secondary text-sm mt-2">By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p>
            <Button disabled={userLoading} onClick={handleRegister} variant='contained' className={`bg-green text-white fw-bolder p-1 d-block mx-auto w-50 fs-6 ${userLoading && "btn-disabled"}`}>
            {
                userLoading ? (<ProgressBar
                visible={true}
                height="30"
                width="100"
                color="#4fa94d"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />) : "Sign Up"
            }
            </Button>
            <Link to='/' className="text-decoration-none text-primary d-block text-center mt-3 mb-2 fw-medium">
            Already have an account?
            </Link>
        </Form>
    </Card>
    
    </>
  )
}

export default RegisterForm