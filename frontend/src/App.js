import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import Login from './pages/authentication/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Register from './pages/authentication/Register';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
    </>
  )
}

export default App