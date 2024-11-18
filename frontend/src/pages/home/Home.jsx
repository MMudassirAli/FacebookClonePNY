import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/home/Header';
import {Row,Col} from "react-bootstrap";
import Sidebar from '../../components/home/Sidebar';
import Posts from '../../components/home/Posts';

const Home = () => {

  const {user} = useSelector((state)=>state.user);
  const navigate = useNavigate();
    useEffect(()=>{
      if(user?.otp !== null){
        navigate("/otp");
        toast.error("Please Verify your Account!");
      }
    },[])

  return (
    <>
    <Header/>
    <Row>
      <Col lg={2}>
      <Sidebar/>
      </Col>
      <Col lg={8}>
      <Posts/>
      </Col>
      <Col lg={2}></Col>
    </Row>
    </>
  )
}

export default Home