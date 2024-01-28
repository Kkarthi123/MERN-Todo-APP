import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export default function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifyMessage, setNotifyMessage] = useState('');

  useEffect(()=>{
    let token = localStorage.getItem("authToken");
    if(token){
      navigate('/notes')
    }
  })

  const registerUser = async (e)=>{
    e.preventDefault()

    try{
      if(userName && email && password && confirmPassword){
        if(password !== confirmPassword){
          messageHandler("Password Doesn't match")
        }else{
          let {data} = await axios.post("/api/user/create",{
            name: userName,
            email: email,
            password: password
          });
          if(data){
            localStorage.setItem("authToken", JSON.stringify(data))
          }
        }
      }
      else{
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
       { notifyMessage && <div className='form-error-msg'>{notifyMessage}</div>}
      <form onSubmit={(e)=> registerUser(e)}>
        <div className='input-field'>
          <label htmlFor='name'>User Name</label>
          <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} id='name' placeholder='User Name' name='name'/>
        </div>
        <div className='input-field'>
          <label htmlFor='email'>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name='email' id='email' placeholder='Email'/>
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input type='password' value={password} onChange={(e) => setPassWord(e.target.value)} name='password' id='password' placeholder='Password'/>
        </div>
        <div className='input-field'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name='confirmPassword' id='confirmPassword' placeholder='Confirm password'/>
        </div>
        <div className='auth-submit-btn'>
          <input type='submit' value='Create Account'/>
        </div>
        <div className='already-acc-dec'>Already have account? <Link to="/login">Sign In</Link></div>
      </form>
      
    </div>
  )
}
