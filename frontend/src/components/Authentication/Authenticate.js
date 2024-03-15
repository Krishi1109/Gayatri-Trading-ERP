import React from 'react'
import { useSelector } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom';

const Authenticate = () => {
  const {isAuth} = useSelector((state) => state.auth)
    return ((isAuth === true)) ? <Outlet /> : <Navigate to='/' />;
}

export default Authenticate