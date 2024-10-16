import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';



function ProtectedRoutes() {
    const isAuth = useSelector((state) => state.user.isAuthenticated);
    console.log(isAuth);
    return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes