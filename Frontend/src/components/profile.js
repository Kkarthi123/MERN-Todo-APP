import React, { useState } from 'react'  
import Nav  from './nav';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Profile() {
  const auth = JSON.parse(localStorage.getItem("authToken"));
  const navigate = useNavigate();
  const [userName, setUserName] = useState(auth.name);
  const [email, setEmail] = useState(auth.email);
  const [password, setPassWord] = useState("");
  const [notifyMessage, setNotifyMessage] = useState('');



  const config = {
    authorization: `Bearer ${auth?.token}`
  }


  const saveProfileChanges = async (e)=>{
    e.preventDefault();
    
    if(userName === '' || email === ''){
      messageHandler("Please fill the Required Fields")
    }

    if( userName !== auth.name || email !== auth.email || password !== '' ){
      let {data} = await axios.post("/api/updatepProfile", {
        name: userName,
        email: email,
        password: password
      }, {headers: config});
     if(data){
      localStorage.setItem("authToken", JSON.stringify(data));
     }
    }

    navigate('/user/my-notes');
  }

  const messageHandler = (msg)=>{
    setNotifyMessage(msg)
    setTimeout(function(){
      setNotifyMessage(null)
    }, 2000)
  }

  return (
    <div className='todo_main_conatiner'>
      <Nav auth={auth}/>
      { notifyMessage && <div className='notify-message form-error-msg'>{notifyMessage}</div>}
      <div className='user-profiler-cont'>
        <form onSubmit={(e)=> saveProfileChanges(e)}>
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
          <div className='auth-submit-btn'>
            <input type='submit' value='Save Changes'/>
          </div>
        </form>
      </div>
    </div>
  )
}
