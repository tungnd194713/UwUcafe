import { React, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
    const auth = ( localStorage.getItem("access_token") != null ) ? true : null ;

    // If has token, return outlet in other case return navigate to login page

    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthGuard