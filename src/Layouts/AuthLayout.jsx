import React from 'react';
import NavBar from '../Components/Navigation/NavBar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='bg-[#F7F6F2]'>
            <NavBar/>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;