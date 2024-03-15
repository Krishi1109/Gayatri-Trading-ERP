import React from 'react'
import { useSelector } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom';

const Authenticate = () => {
  const {isAuth} = useSelector((state) => state.auth)
    return ((isAuth === true)) ? <div className='my-16 '> <Outlet /> </div> : <Navigate to='/' />;
}

export default Authenticate