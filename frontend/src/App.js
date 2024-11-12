import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import Login from './pages/authentication/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Register from './pages/authentication/Register';
import {Toaster} from "react-hot-toast";
import Home from './pages/home/Home';
import OTP from './pages/authentication/OTP';

const App = () => {
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