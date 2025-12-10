import React from 'react';
import NavBar from '../Components/Navigation/NavBar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;