import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import Login from './pages/authentication/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Register from './pages/authentication/Register';
import {Toaster} from "react-hot-toast";
import Home from './pages/home/Home';
import OTP from './pages/authentication/OTP';
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {

  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const handleLoad = () => {
      setLoading(false);
    }

    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load",handleLoad);
  },[]);

  if(loading){
    return (
      <>
      <div className="d-flex justify-content-center align-items-center height-100">
        <img width={70} height={70} src="https://leadsbridge.com/wp-content/themes/leadsbridge/img/integration-lg-logos/logo370.png" alt="" />
      </div>
      </>
    )
  }

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/otp' element={<OTP />} />
      </Routes>
      <Toaster/>
    </Router>
    </>
  )
}

export default App