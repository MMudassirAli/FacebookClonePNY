import React, { useEffect, useState } from 'react'
import {Button} from "@mui/material";
import { Form } from 'react-bootstrap'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import {Link} from "react-router-dom";

const LoginForm = () => {

    const [showeye, setShoweye] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [formfields, setFormfields] = useState({
        m_mail : "",
        password : "",
    });

    const {m_mail,password} = formfields;

    const handleChange = (e) => {
        setFormfields({
            ...formfields,
            [e.target.name] : e.target.value,
        })
    }

    useEffect(()=>{
        if(password.length > 0){
            setShoweye(true)
        }else{
            setShoweye(false)
        }
    },[password]);

  return (
    <>
    <Form className='p-3 shadow rounded-4 col-lg-10 mx-auto bg-white'>
        <Form.Control value={m_mail} name='m_mail' onChange={handleChange} className='p-2 shadow-0 outline-blue' type='text' placeholder='Email address or phone number' />
        <div className="d-flex align-items-center outline-blue border my-2 rounded-2 pe-3">
        <Form.Control value={password} name='password' onChange={handleChange} className='border-0 p-2 shadow-0 ' type={`${showPass ? "text" : "password"}`} placeholder='Password' />
        {
            showeye && (
                <>
                {
                    showPass ? (
                    <>
                    <FaRegEye onClick={()=>setShowPass(false)} size={20} cursor={'pointer'} />
                    </>) : (
                    <>
                    <FaRegEyeSlash onClick={()=>setShowPass(true)} size={20} cursor={'pointer'} />
                    </>)
                }
                </>
            )
        }
        </div>
    <Button variant='contained' className='w-100 my-1 p-2 bg-blue fw-bold'>Log in</Button>
    <a href="" className="text-decoration-none text-center d-block my-2">Forgotten password?</a>
    <hr />
    <Link to='/register'>
    <Button variant='contained' className='d-block mx-auto w-50 bg-green fw-bold py-2 px-1 text-capitalize'>Create new account</Button>
    </Link>
    </Form>
    </>
  )
}

export default LoginForm