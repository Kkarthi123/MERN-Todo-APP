import React from 'react'
import { Navigate } from "react-router-dom";


export const RequireAuth = ({component})=>{
    let auth = JSON.parse(localStorage.getItem("authToken"));

    if(!auth){
        return <Navigate to="/"/>
    }else{
        return component
    }

}


