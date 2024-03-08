import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";




export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [notifyMessage, setNotifyMessage] = useState('');
  const [login, setLogin] = useState(false)

  useEffect(()=>{
    let token = localStorage.getItem("authToken");
    if(token){
      navigate('/user/my-notes')
    }
  }, [login])

  const signInUser = async (e) => {
    e.preventDefault()

    try{
      if (email && password) {
        let { data } = await axios.post("/api/user/login", {
          email: email,
          password: password
        });
        if (data) {
          localStorage.setItem("authToken", JSON.stringify(data))
          setLogin(true)
        }
      }
      else {
        messageHandler("Please fill all the fields")
      }
    }
    catch({response: {data}}){
      messageHandler(data.message)
    }

   
  }

  const messageHandler = (msg)=>{
    setNotifyMessage(msg)
    setTimeout(function(){
      setNotifyMessage(null)
    }, 2000)
  }


  return (
    <div className='auth-form'>
      {notifyMessage && <div className='notify-message form-error-msg'>{notifyMessage}</div>}
      <form onSubmit={(e) => signInUser(e)}>
        <div className='input-field'>
          <label htmlFor='email'>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name='email' id='email' placeholder='Email' />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input type='password' value={password} onChange={(e) => setPassWord(e.target.value)} name='password' id='password' placeholder='Password' />
        </div>
        <div className='auth-submit-btn'>
          <input type='submit' value='Sign In' />
        </div>
      <div className='new-user-dec'>New User? <Link to="/register">Sign Up</Link></div>

      </form>
    </div>
  )
}

