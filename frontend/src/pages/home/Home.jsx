import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/home/Header';
import {Row,Col, Container} from "react-bootstrap";
import Sidebar from '../../components/home/Sidebar';
import Posts from '../../components/home/Posts';
import Users from '../../components/home/Users';
// import showRequestPopUp from '../../components/home/requests/showRequestPopUp'

const Home = () => {

  const {user} = useSelector((state)=>state.user);
  const navigate = useNavigate();
    useEffect(()=>{
      if(user?.otp !== null){
        navigate("/otp");
        toast.error("Please Verify your Account!");
      }
    },[]);



  return (
    <>
      <Header />
      <Container fluid className="mt-2">
        <Row>
          {/* Left Sidebar - Hidden on small screens */}
          <Col xl={3} lg={3} className="d-none d-lg-block">
            <Sidebar />
          </Col>

          {/* Posts (Main Content) */}
          <Col xl={6} lg={6} md={12} sm={12} className="">
            <Posts />
          </Col>

          {/* Right Sidebar (Users) - Hidden on small screens */}
          <Col xl={3} lg={3} className="d-none d-lg-block">
            <Users />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home