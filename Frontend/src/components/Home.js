import React from 'react';
import { Outlet } from "react-router-dom";


export default function Home() {
  return (

    <div id='home-page'>
      <div className='home-page-cont'>
        <div className='home-page-lhs'>
          <div className='home-page-main-content'>
            <h2>Create Your First Todo Now :)</h2>
            <p>Make your daily task easy with our todo. Easy way to create, edit and delete your todo.</p>
          </div>
          <div className='home-page-image'>
          </div>
        </div>
        <div className='home-page-rhs'>
         <Outlet/>
        </div>
      </div>
    </div>

   
  )
}
