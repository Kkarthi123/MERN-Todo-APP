import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import {useEffect } from 'react';



const AuthUi = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("authToken");
    if (token) {
      navigate('/notes')
    }
  }, [])

  return (
    <div className='home-page-rhs'>
      <div className='home-page-auth-btn'>
        <div className='login-btn'>
          <span className='label'>Already have an account?</span>
          <Link to="/login"> <button>Log In</button></Link>
        </div>
        <div className='auth-btn-seperator-line'>or</div>
        <div className='signup-btn'>
          <span className='label'>Sign Up to create new account!</span>
          <Link to="/register"> <button>Sign Up</button></Link>
        </div>
      </div>
    </div>
  )
}

export default AuthUi