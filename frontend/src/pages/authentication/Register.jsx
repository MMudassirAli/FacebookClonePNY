import React from 'react'
import {Container} from "react-bootstrap";
import logo from "../../assets/images/Facebook-Logo.png";
import RegisterForm from '../../components/authentication/RegisterForm';
import "../../components/authentication/utils/auth.css";

const Register = () => {
  return (
    <>
    <Container>
        <img src={logo} className='d-block mx-auto' width={240} alt="apni book logo" />
        <RegisterForm />
    </Container>
    </>
  )
}

export default Register