import React from 'react'
import { Link, useNavigate} from 'react-router-dom';

function Nav({auth:{name}}) {
    const navigate = useNavigate();

    const logOut = ()=>{
        localStorage.removeItem("authToken");
        navigate("/")
    }
    
  return (
    <div className='navigation-header'>
    <Link to="/user/my-notes">
    <div className='app-name'>
      <i className="fa-solid fa-clipboard-list"></i>
      <span>To Do</span>
     </div>
    </Link>
     <div className='user-details'>
       <div className='user-icon-cont'>
        <Link to={"/user/profile"}>
         <div className='user-icon'>
            <i className="fa-solid fa-user"></i>
         </div>
         </Link>
         <div className='user-detail-cont'>
           <div className='username'>{name}</div>
           <div className='profile-page-link'><Link to={"/user/profile"}>Profile</Link></div>
           <div className='logout' onClick={logOut}>Log Out</div>
         </div>
       </div>
     </div>
  </div>
  )
}

export default Nav