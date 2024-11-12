import React, { useEffect } from 'react'
import {Col, Container, Row} from "react-bootstrap";
import logo from "../../assets/images/Facebook-Logo.png";
import "../../components/authentication/utils/auth.css";
import LoginForm from '../../components/authentication/LoginForm';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {user} = useSelector((state)=>state.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      navigate("/home");
    }
  },[])

  return (
    <>
    <Container className='col-xl-9 col-lg-8 col-md-9 col-sm-10 mx-auto d-flex justify-content-center align-items-center height-70'>
        <Row className='w-100'>
            <Col lg={6}>
            <img src={logo} width={200} alt="Apni Book Logo" />
            <h3 className="display-6 m-0 fw-normal">Recent logins</h3>
            <p className="text-secondary">Click your picture or add an account.</p>
            </Col>
            <Col lg={6}>
            <LoginForm />
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Login